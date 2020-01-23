data "aws_iam_policy_document" "jwt_enrichment_hook_lambda" {
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

resource "aws_iam_role" "jwt_enrichment_hook" {
  name               = "${var.project_name}_jwt_enrichment_hook"
  assume_role_policy = "${data.aws_iam_policy_document.jwt_enrichment_hook_lambda.json}"
  tags               = "${var.default_tags}"
}

resource "aws_iam_role_policy_attachment" "jwt_enrichment_hook_basic" {
  role       = "${aws_iam_role.jwt_enrichment_hook.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "template_file" "jwt_enrichment_hook" {
  template = "${file("${path.module}/lambda_src/jwt_enrichment_hook.js")}"
}

data "archive_file" "jwt_enrichment_hook_lambda_fnc" {
  type        = "zip"
  output_path = "${path.root}/.zip/${var.project_name}_jwt_enrichment_hook.zip"

  source {
    filename = "jwt-enrichment-hook.js"
    content  = "${data.template_file.jwt_enrichment_hook.rendered}"
  }
}

resource "aws_lambda_function" "jwt_enrichment_hook" {
  function_name    = "${var.project_name}_jwt_enrichment_hook"
  filename         = "${substr(data.archive_file.jwt_enrichment_hook_lambda_fnc.output_path, length(path.cwd) + 1, -1)}"
  source_code_hash = "${data.archive_file.jwt_enrichment_hook_lambda_fnc.output_base64sha256}"
  role             = "${aws_iam_role.jwt_enrichment_hook.arn}"
  runtime          = "nodejs10.x"
  handler          = "jwt-enrichment-hook.handler"
  memory_size      = 128
  timeout          = 3
  tags             = "${var.default_tags}"

  environment {
    variables = {
      GRAPHQL_ADMIN_SECRET = "${var.HASURA_GRAPHQL_ADMIN_SECRET}"
      GRAPHQL_API          = "https://${aws_route53_record.ecs_alb.name}/v1/graphql"
    }
  }

  lifecycle {
    ignore_changes = [
      "source_code_hash",
      "last_modified",
    ]
  }
}

resource "aws_lambda_permission" "jwt_enrichment_hook" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.jwt_enrichment_hook.function_name}"
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = "${aws_cognito_user_pool.main.arn}"
}
