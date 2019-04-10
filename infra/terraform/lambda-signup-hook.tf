data "aws_iam_policy_document" "signup_hook_lambda" {
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

resource "aws_iam_role" "signup_hook" {
  name               = "${var.project_name}_signup_hook"
  assume_role_policy = "${data.aws_iam_policy_document.signup_hook_lambda.json}"
}

resource "aws_iam_role_policy_attachment" "signup_hook_basic" {
  role       = "${aws_iam_role.signup_hook.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "signup_hook" {
  function_name    = "${var.project_name}_signup_hook"
  filename         = "lambda_src/signup-hook.zip"
  source_code_hash = "${base64sha256(file("lambda_src/signup-hook.zip"))}"
  role             = "${aws_iam_role.signup_hook.arn}"
  runtime          = "nodejs8.10"
  handler          = "signup-hook.handler"
  memory_size      = 128
  timeout          = 3

  environment {
    variables = {
      GRAPHQL_ADMIN_SECRET = "${var.HASURA_GRAPHQL_ADMIN_SECRET}"
      GRAPHQL_API          = "${var.HASURA_GRAPHQL_API}"
    }
  }

  lifecycle {
    ignore_changes = [
      "source_code_hash",
      "last_modified"
    ]
  }
}

resource "aws_lambda_permission" "signup_hook" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.signup_hook.function_name}"
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = "${aws_cognito_user_pool.pool.arn}"
}
