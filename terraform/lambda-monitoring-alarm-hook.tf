data "template_file" "monitoring_alarm_hook" {
  count    = "${var.alarms_enabled ? 1 : 0}"
  template = "${file("${path.module}/lambda_src/monitoring_alarm_hook.js")}"
}

data "archive_file" "monitoring_alarm_hook_fnc" {
  count       = "${var.alarms_enabled ? 1 : 0}"
  type        = "zip"
  output_path = "${path.root}/.zip/${var.project_name}_monitoring_alarm_hook.zip"

  source {
    filename = "monitoring-alarm-hook.js"
    content  = "${data.template_file.monitoring_alarm_hook.rendered}"
  }
}

resource "aws_lambda_function" "monitoring_alarm_hook" {
  count            = "${var.alarms_enabled ? 1 : 0}"
  function_name    = "${var.org}_monitoring_alarm_hook"
  filename         = "${substr(data.archive_file.monitoring_alarm_hook_fnc.output_path, length(path.cwd) + 1, -1)}"
  source_code_hash = "${data.archive_file.monitoring_alarm_hook_fnc.output_base64sha256}"
  role             = "${aws_iam_role.monitoring_alarm_hook.arn}"
  runtime          = "nodejs10.x"
  handler          = "monitoring-alarm-hook.handler"
  memory_size      = 128
  timeout          = 15
  tags             = "${var.default_tags}"

  environment {
    variables = {
      SLACK_WEBHOOK = "${var.alarms_slack_notification_webhook}"
      PROJECT_NAME  = "${var.project_name}"
    }
  }

  lifecycle {
    ignore_changes = [
      "last_modified",
    ]
  }
}

resource "aws_lambda_permission" "monitoring_alarm_hook" {
  count         = "${var.alarms_enabled ? 1 : 0}"
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.monitoring_alarm_hook.function_name}"
  principal     = "sns.amazonaws.com"
  source_arn    = "${aws_sns_topic.monitoring_alarms.arn}"
}

data "aws_iam_policy_document" "monitoring_alarm_hook" {
  count = "${var.alarms_enabled ? 1 : 0}"

  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"

      identifiers = [
        "lambda.amazonaws.com",
      ]
    }
  }
}

resource "aws_iam_role" "monitoring_alarm_hook" {
  count              = "${var.alarms_enabled ? 1 : 0}"
  name               = "${var.project_name}_monitoring_alarm_hook"
  assume_role_policy = "${data.aws_iam_policy_document.monitoring_alarm_hook.json}"
  tags               = "${var.default_tags}"
}

resource "aws_iam_role_policy_attachment" "monitoring_alarm_hook_basic" {
  count      = "${var.alarms_enabled ? 1 : 0}"
  role       = "${aws_iam_role.monitoring_alarm_hook.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
