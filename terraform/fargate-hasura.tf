resource "aws_security_group" "lb" {
  name        = "${var.project_name}-ecs-alb"
  description = "controls access to the ALB"
  vpc_id      = "${aws_vpc.main.id}"
  tags        = "${var.default_tags}"

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "hasura" {
  name        = "${var.project_name}-hasura"
  description = "allow inbound access from the ALB only"
  vpc_id      = "${aws_vpc.main.id}"
  tags        = "${var.default_tags}"

  ingress {
    protocol        = "tcp"
    from_port       = "${var.hasura_port}"
    to_port         = "${var.hasura_port}"
    security_groups = ["${aws_security_group.lb.id}"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_route53_record" "ecs_alb" {
  zone_id = "${data.aws_route53_zone.primary.zone_id}"
  name    = "${var.hasura_domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_alb.hasura.dns_name}"
    zone_id                = "${aws_alb.hasura.zone_id}"
    evaluate_target_health = true
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_alb" "hasura" {
  name            = "${var.project_name}-ecs-hasura"
  subnets         = ["${aws_subnet.hasura_ecs.*.id}"]
  security_groups = ["${aws_security_group.lb.id}"]
  tags            = "${var.default_tags}"
}

resource "aws_alb_target_group" "hasura" {
  name        = "${var.project_name}-ecs-hasura"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = "${aws_vpc.main.id}"
  target_type = "ip"
  tags        = "${var.default_tags}"

  health_check {
    matcher             = "200-304"
    path                = "/v1/version"
    unhealthy_threshold = 5
  }
}

resource "aws_alb_listener" "hasura_front_end_ssl" {
  load_balancer_arn = "${aws_alb.hasura.id}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "${aws_acm_certificate_validation.wildcard_cert.certificate_arn}"

  default_action {
    target_group_arn = "${aws_alb_target_group.hasura.id}"
    type             = "forward"
  }
}

### ECS

data "template_file" "hasura_container_definition_app" {
  template = "${file("${path.root}/fargate_container_definitions/hasura.json.tpl")}"

  vars {
    app_name                         = "${var.project_name}-hasura"
    app_image                        = "hasura/graphql-engine:latest"
    fargate_cpu                      = "512"
    fargate_memory                   = "1024"
    aws_region                       = "${var.aws_region}"
    app_port                         = "${var.hasura_port}"
    HASURA_GRAPHQL_DATABASE_URL      = "postgres://${module.rds.this_db_instance_username}:${module.rds.this_db_instance_password}@${module.rds.this_db_instance_endpoint}/${module.rds.this_db_instance_name}"
    HASURA_GRAPHQL_ADMIN_SECRET      = "${var.HASURA_GRAPHQL_ADMIN_SECRET}"
    HASURA_GRAPHQL_ENABLE_CONSOLE    = "${var.HASURA_GRAPHQL_ENABLE_CONSOLE}"
    HASURA_GRAPHQL_JWT_SECRET        = "{ \\\"type\\\": \\\"RS256\\\", \\\"jwk_url\\\": \\\"https://${aws_cognito_user_pool.main.endpoint}/.well-known/jwks.json\\\", \\\"claims_format\\\": \\\"stringified_json\\\" }"
    HASURA_GRAPHQL_ENABLE_TELEMETRY  = "false"
    HASURA_GRAPHQL_UNAUTHORIZED_ROLE = "${var.HASURA_GRAPHQL_UNAUTHORIZED_ROLE}"
  }
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name = "${var.project_name}ecsTaskExecutionRole"
  tags = "${var.default_tags}"

  assume_role_policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole-attach" {
  role       = "${aws_iam_role.ecsTaskExecutionRole.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_cluster" "hasura" {
  name = "${var.project_name}-hasura"
  tags = "${var.default_tags}"
}

resource "aws_ecs_task_definition" "hasura" {
  family                   = "${var.project_name}-hasura"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  container_definitions    = "${data.template_file.hasura_container_definition_app.rendered}"
  tags                     = "${var.default_tags}"
}

resource "aws_ecs_service" "hasura" {
  name            = "${var.project_name}-hasura"
  cluster         = "${aws_ecs_cluster.hasura.id}"
  task_definition = "${aws_ecs_task_definition.hasura.arn}"
  desired_count   = "1"
  launch_type     = "FARGATE"

  network_configuration {
    assign_public_ip  = true
    security_groups   = ["${aws_security_group.hasura.id}"]
    subnets           = ["${aws_subnet.hasura_ecs.*.id}"]
  }

  load_balancer {
    target_group_arn = "${aws_alb_target_group.hasura.id}"
    container_name   = "${var.project_name}-hasura"
    container_port   = "${var.hasura_port}"
  }

  depends_on = [
    "aws_alb_listener.hasura_front_end_ssl",
  ]
}

data "aws_iam_policy_document" "hasura_autoscale_assume_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"

      identifiers = [
        "application-autoscaling.amazonaws.com",
      ]
    }
  }
}

## AUTOSCALING
resource "aws_appautoscaling_target" "hasura" {
  max_capacity       = 5
  min_capacity       = 1
  resource_id        = "service/${aws_ecs_cluster.hasura.name}/${aws_ecs_service.hasura.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "hasura" {
  name               = "${var.project_name}_hasura_autoscale"
  policy_type        = "TargetTrackingScaling"
  resource_id        = "${aws_appautoscaling_target.hasura.resource_id}"
  scalable_dimension = "${aws_appautoscaling_target.hasura.scalable_dimension}"
  service_namespace  = "${aws_appautoscaling_target.hasura.service_namespace}"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    target_value       = 70
    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }
}

##LOGS
resource "aws_cloudwatch_log_group" "hasura" {
  name              = "/ecs/${var.project_name}-hasura"
  retention_in_days = 30
  tags              = "${merge(var.default_tags, map("Name", "${var.project_name}-hasura"))}"
}

resource "aws_cloudwatch_log_metric_filter" "hasura_query_time" {
  name           = "${var.project_name}_QueryExecutionTime_filter"
  pattern        = "{ ($.type= \"http-log\") && ($.detail.operation.query_execution_time = * ) }"
  log_group_name = "${aws_cloudwatch_log_group.hasura.name}"

  metric_transformation {
    name          = "${var.project_name}_QueryExecutionTime"
    namespace     = "${var.project_name}_hasura"
    value         = "$.detail.operation.query_execution_time"
    default_value = 0
  }
}
