data "aws_iam_policy_document" "sns_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cognito-idp.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "sts:ExternalId"

      values = ["${var.project_name}_role_external_id"]
    }
  }
}

resource "aws_iam_role" "sns_role" {
  name               = "${var.project_name}_sns_role"
  assume_role_policy = "${data.aws_iam_policy_document.sns_role_policy.json}"
}

data "aws_iam_policy_document" "sns_role_inline_policy" {
  statement {
    actions   = ["sns:Publish"]
    effect    = "Allow"
    resources = ["*"]
  }
}

resource "aws_iam_policy" "sns_role_policy" {
  name   = "${var.project_name}_sns_role"
  policy = "${data.aws_iam_policy_document.sns_role_inline_policy.json}"
}

resource "aws_iam_role_policy_attachment" "sns_role_policy" {
  role       = "${aws_iam_role.sns_role.name}"
  policy_arn = "${aws_iam_policy.sns_role_policy.arn}"
}

resource "aws_cognito_user_pool" "pool" {
  admin_create_user_config {
    allow_admin_create_user_only = false
    unused_account_validity_days = 7
  }

  auto_verified_attributes = ["email"]

  # lambda_config {
  #   post_confirmation    = "arn:aws:lambda:eu-west-1:218551634871:function:knowledgebase-create-user-in-db"
  #   pre_token_generation = "arn:aws:lambda:eu-west-1:218551634871:function:knowledgebase-add-hasura-jwt-claims"
  # }

  mfa_configuration = "OFF"
  name              = "${var.project_name}_user_pool"
  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }
  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      max_length = 2048
      min_length = 0
    }
  }
  sms_configuration {
    external_id    = "${var.project_name}_role_external_id"
    sns_caller_arn = "${aws_iam_role.sns_role.arn}"
  }
  sms_verification_message   = "Your verification code is {####}"
  email_verification_message = "Your verification code is {####}"
  email_verification_subject = "Your verification code"
}

resource "aws_cognito_user_pool_client" "client_web" {
  name         = "${var.project_name}_app_client_web"
  user_pool_id = "${aws_cognito_user_pool.pool.id}"
}

resource "aws_cognito_user_pool_client" "client" {
  name         = "${var.project_name}_app_client"
  user_pool_id = "${aws_cognito_user_pool.pool.id}"

  generate_secret = true
}

resource "aws_cognito_user_group" "admins" {
  name         = "Admins"
  role_arn     = "${aws_iam_role.auth.arn}"
  user_pool_id = "${aws_cognito_user_pool.pool.id}"
}

resource "aws_cognito_user_group" "members" {
  name         = "Members"
  role_arn     = "${aws_iam_role.auth.arn}"
  user_pool_id = "${aws_cognito_user_pool.pool.id}"
}

data "aws_iam_policy_document" "auth_role_policy" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"

    principals {
      type        = "Federated"
      identifiers = ["cognito-identity.amazonaws.com"]
    }

    condition {
      test     = "ForAnyValue:StringLike"
      variable = "cognito-identity.amazonaws.com:amr"

      values = ["authenticated"]
    }
  }
}

resource "aws_iam_role" "auth" {
  name               = "${var.project_name}_auth_role"
  assume_role_policy = "${data.aws_iam_policy_document.auth_role_policy.json}"
}
