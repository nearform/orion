locals {
  hasura_qet_metric    = "${var.project_name}_QueryExecutionTime"
  hasura_qet_namespace = "${var.project_name}_hasura"
}

resource "aws_sns_topic" "monitoring_alarms" {
  count = "${var.alarms_enabled ? 1 : 0}"
  name  = "${var.project_name}_monitoring_alarms"
  tags  = "${var.default_tags}"
}

//DASHBOARD
resource "aws_cloudwatch_dashboard" "monitoring_alarms_dashboard" {
  # (resource arguments)
  dashboard_name = "${var.project_name}_main"

  dashboard_body = <<EOF
{
    "widgets": [
        {
            "type": "log",
            "x": 0,
            "y": 15,
            "width": 24,
            "height": 6,
            "properties": {
                "query": "SOURCE '/aws/lambda/${aws_lambda_function.signup_hook.function_name}' | SOURCE '/aws/lambda/${aws_lambda_function.jwt_enrichment_hook.function_name}' | fields @timestamp, @log, @message\n| filter level >= 40\n",
                "region": "${var.aws_region}",
                "stacked": false,
                "title": "Lambda Log Errors",
                "view": "table"
            }
        },
        {
            "type": "metric",
            "x": 0,
            "y": 6,
            "width": 12,
            "height": 6,
            "properties": {
                "metrics": [
                    [ "${local.hasura_qet_namespace}", "${local.hasura_qet_metric}", { "period": 60, "stat": "Average", "id": "m1" } ]
                ],
                "view": "timeSeries",
                "stacked": false,
                "region": "${var.aws_region}",
                "title": "Hasura Query Execution time"
            }
        },
        {
            "type": "metric",
            "x": 15,
            "y": 12,
            "width": 9,
            "height": 3,
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", "${var.rds_identifier}" ]
                ],
                "region": "${var.aws_region}",
                "title": "RDS CPU"
            }
        },
        {
            "type": "metric",
            "x": 12,
            "y": 6,
            "width": 12,
            "height": 6,
            "properties": {
                "metrics": [
                    [ "AWS/ECS", "CPUUtilization", "ServiceName", "${aws_ecs_service.hasura.name}", "ClusterName", "${aws_ecs_cluster.hasura.name}", { "stat": "Average", "period": 60, "id": "m1" } ],
                    [ ".", "MemoryUtilization", ".", ".", ".", ".", { "period": 60, "stat": "SampleCount", "id": "m2", "yAxis": "right" } ]
                ],
                "view": "timeSeries",
                "stacked": false,
                "region": "${var.aws_region}",
                "title": "Hasura CPU/Memory Utilization",
                "period": 300
            }
        },
        {
            "type": "metric",
            "x": 0,
            "y": 12,
            "width": 9,
            "height": 3,
            "properties": {
                "metrics": [
                    [ "AWS/Lambda", "Duration", "FunctionName", "${aws_lambda_function.signup_hook.function_name}", { "period": 3600 } ],
                    [ "...", "${aws_lambda_function.jwt_enrichment_hook.function_name}", { "period": 3600 } ]
                ],
                "view": "singleValue",
                "stacked": false,
                "region": "${var.aws_region}",
                "title": "Cognito Lambda durations",
                "period": 300
            }
        },
        {
            "type": "metric",
            "x": 9,
            "y": 12,
            "width": 6,
            "height": 3,
            "properties": {
                "metrics": [
                    [ "AWS/RDS", "FreeStorageSpace", "DBInstanceIdentifier", "${var.rds_identifier}", { "stat": "Maximum", "period": 300, "id": "m1" } ]
                ],
                "view": "singleValue",
                "stacked": false,
                "region": "${var.aws_region}",
                "setPeriodToTimeRange": false,
                "title": "RDS Free Storage Space"
            }
        },
        {
            "type": "metric",
            "x": 0,
            "y": 0,
            "width": 12,
            "height": 6,
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/CloudFront", "Requests", "Region", "Global", "DistributionId", "${aws_cloudfront_distribution.app.id}" ]
                ],
                "region": "us-east-1",
                "title": "Requests (sum)",
                "yAxis": {
                    "left": {
                        "showUnits": false
                    },
                    "right": {
                        "showUnits": false
                    }
                },
                "stat": "Sum"
            }
        },
        {
            "type": "metric",
            "x": 12,
            "y": 0,
            "width": 12,
            "height": 6,
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/CloudFront", "TotalErrorRate", "Region", "Global", "DistributionId", "${aws_cloudfront_distribution.app.id}" ],
                    [ ".", "4xxErrorRate", ".", ".", ".", ".", { "label": "Total4xxErrors" } ],
                    [ ".", "5xxErrorRate", ".", ".", ".", ".", { "label": "Total5xxErrors" } ],
                    [ { "expression": "(m4+m5+m6)/m7*100", "label": "5xxErrorByLambdaEdge", "id": "e1" } ],
                    [ "AWS/CloudFront", "LambdaExecutionError", "Region", "Global", "DistributionId", "${aws_cloudfront_distribution.app.id}", { "id": "m4", "stat": "Sum", "visible": false } ],
                    [ ".", "LambdaValidationError", ".", ".", ".", ".", { "id": "m5", "stat": "Sum", "visible": false } ],
                    [ ".", "LambdaLimitExceededErrors", ".", ".", ".", ".", { "id": "m6", "stat": "Sum", "visible": false } ],
                    [ ".", "Requests", ".", ".", ".", ".", { "id": "m7", "stat": "Sum", "visible": false } ]
                ],
                "region": "us-east-1",
                "title": "Error rate (as a percentage of total requests)",
                "yAxis": {
                    "left": {
                        "showUnits": false
                    },
                    "right": {
                        "showUnits": false
                    }
                }
            }
        }
    ]
}
EOF
}

//LAMBDAS
resource "aws_sns_topic_subscription" "monitoring_alarms_lambda" {
  count     = "${var.alarms_enabled ? 1 : 0}"
  topic_arn = "${aws_sns_topic.monitoring_alarms.arn}"
  protocol  = "lambda"
  endpoint  = "${aws_lambda_function.monitoring_alarm_hook.arn}"
  tags      = "${var.default_tags}"
}

resource "aws_cloudwatch_metric_alarm" "lambda_errors_increase" {
  count               = "${var.alarms_enabled ? 1 : 0}"
  alarm_name          = "${var.project_name}-lambda-errors-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  threshold           = "5"
  alarm_description   = "https://console.aws.amazon.com/cloudwatch/home?region=${var.aws_region}#dashboards:name=${aws_cloudwatch_dashboard.monitoring_alarms_dashboard.dashboard_name}"
  alarm_actions       = ["${aws_sns_topic.monitoring_alarms.arn}"]
  treat_missing_data  = "notBreaching"
  tags                = "${var.default_tags}"

  metric_query {
    id          = "e1"
    label       = "${var.project_name}Errors"
    expression  = "SUM(METRICS())"
    return_data = true
  }

  metric_query {
    id = "l0"

    metric {
      metric_name = "Errors"
      namespace   = "AWS/Lambda"
      stat        = "Sum"
      period      = "60"

      dimensions {
        FunctionName = "${aws_lambda_function.signup_hook.function_name}"
      }
    }
  }

  metric_query {
    id = "l1"

    metric {
      metric_name = "Errors"
      namespace   = "AWS/Lambda"
      stat        = "Sum"
      period      = "60"

      dimensions {
        FunctionName = "${aws_lambda_function.jwt_enrichment_hook.function_name}"
      }
    }
  }
}

//HASURA
resource "aws_cloudwatch_metric_alarm" "hasura_scaling" {
  count               = "${var.alarms_enabled ? 1 : 0}"
  alarm_name          = "${var.project_name}-hasura-scaling-alarm"
  comparison_operator = "GreaterThanThreshold"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  evaluation_periods  = "1"
  period              = "60"
  statistic           = "SampleCount"
  threshold           = "1"
  alarm_description   = "Hasura is scalling up!"
  alarm_actions       = ["${aws_sns_topic.monitoring_alarms.arn}"]
  treat_missing_data  = "notBreaching"
  tags                = "${var.default_tags}"

  dimensions = {
    ServiceName = "${aws_ecs_service.hasura.name}"
    ClusterName = "${aws_ecs_cluster.hasura.id}"
  }
}

resource "aws_cloudwatch_metric_alarm" "hasura_query_time" {
  count               = "${var.alarms_enabled ? 1 : 0}"
  alarm_name          = "${var.project_name}-hasura-query-time-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  metric_name         = "${local.hasura_qet_metric}"
  namespace           = "${local.hasura_qet_namespace}"
  evaluation_periods  = "1"
  period              = "60"
  statistic           = "Maximum"
  threshold           = "2"
  alarm_description   = "Some hasura queries are taking more than a 2 seconds to execute!"
  alarm_actions       = ["${aws_sns_topic.monitoring_alarms.arn}"]
  treat_missing_data  = "notBreaching"
  tags                = "${var.default_tags}"

  dimensions = {
    ServiceName = "${aws_ecs_service.hasura.name}"
    ClusterName = "${aws_ecs_cluster.hasura.id}"
  }
}

//RDS
resource "aws_cloudwatch_metric_alarm" "database_cpu" {
  count               = "${var.alarms_enabled ? 1 : 0}"
  alarm_name          = "${var.project_name}-database-cpu"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  metric_name         = "AWS/RDS"
  namespace           = "CPUUtilization"
  evaluation_periods  = "2"
  period              = "300"
  statistic           = "Average"
  threshold           = "40"
  alarm_description   = "DB is running at more than double the baseline CPU!"
  alarm_actions       = ["${aws_sns_topic.monitoring_alarms.arn}"]
  treat_missing_data  = "notBreaching"
  tags                = "${var.default_tags}"

  dimensions = {
    DBInstanceIdentifier = "${var.rds_identifier}"
  }
}

resource "aws_cloudwatch_metric_alarm" "database_free_space" {
  count               = "${var.alarms_enabled ? 1 : 0}"
  alarm_name          = "${var.project_name}-database-free-space"
  comparison_operator = "LessThanOrEqualToThreshold"
  metric_name         = "FreeStorageSpace"
  namespace           = "AWS/RDS"
  evaluation_periods  = "1"
  period              = "300"
  statistic           = "Average"
  threshold           = "1000000000"
  alarm_description   = "DB is running out of disk space!"
  alarm_actions       = ["${aws_sns_topic.monitoring_alarms.arn}"]
  treat_missing_data  = "notBreaching"
  tags                = "${var.default_tags}"

  dimensions = {
    DBInstanceIdentifier = "${var.rds_identifier}"
  }
}
