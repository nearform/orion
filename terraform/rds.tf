resource "aws_security_group" "rds" {
  name        = "${var.project_name}-db"
  description = "allow inbound access from the hasura tasks only"
  vpc_id      = "${aws_vpc.main.id}"
  tags        = "${var.default_tags}"

  ingress {
    protocol        = "tcp"
    from_port       = "5432"
    to_port         = "5432"
    security_groups = ["${aws_security_group.hasura.id}"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
    ignore_changes        = ["ingress", "egress"]
  }
}

module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "1.28.0"

  identifier = "${var.rds_identifier}"

  engine                 = "postgres"
  engine_version         = "9.6.11"
  family                 = "postgres9.6"
  instance_class         = "db.t2.micro"
  allocated_storage      = 5
  name                   = "${var.rds_db_name}"
  username               = "postgres"
  password               = "${var.rds_password}"
  port                   = "5432"
  backup_window          = "03:00-06:00"
  maintenance_window     = "Mon:00:00-Mon:03:00"
  subnet_ids             = ["${aws_subnet.public.*.id}", "${aws_subnet.private.*.id}"]
  vpc_security_group_ids = ["${aws_vpc.main.default_security_group_id}", "${aws_security_group.rds.id}"]
  deletion_protection    = false
  tags                   = "${merge(var.default_tags, map("Name", "${var.project_name}"))}"
}
