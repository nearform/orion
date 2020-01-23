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
  tags               = "${var.default_tags}"
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

resource "aws_cognito_user_pool" "main" {
  admin_create_user_config {
    allow_admin_create_user_only = false
    unused_account_validity_days = 7
  }

  username_attributes = ["email"]

  auto_verified_attributes = ["email"]

  lambda_config {
    post_confirmation    = "${aws_lambda_function.signup_hook.arn}"
    pre_token_generation = "${aws_lambda_function.jwt_enrichment_hook.arn}"
  }

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

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "orgType"
    required                 = false

    string_attribute_constraints {
      max_length = 256
      min_length = 0
    }
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "orgName"
    required                 = false

    string_attribute_constraints {
      max_length = 256
      min_length = 0
    }
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "country"
    required                 = false

    string_attribute_constraints {
      max_length = 256
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
  tags                       = "${var.default_tags}"
}

resource "aws_cognito_user_pool_client" "client_web" {
  name         = "${var.project_name}_app_client_web"
  user_pool_id = "${aws_cognito_user_pool.main.id}"
}

resource "aws_cognito_user_group" "admins" {
  name         = "Admins"
  role_arn     = "${aws_iam_role.auth.arn}"
  user_pool_id = "${aws_cognito_user_pool.main.id}"
}

resource "aws_cognito_user_group" "members" {
  name         = "Members"
  role_arn     = "${aws_iam_role.auth.arn}"
  user_pool_id = "${aws_cognito_user_pool.main.id}"
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
  tags               = "${var.default_tags}"
}

data "aws_iam_policy_document" "uploaded_assets_access" {
  statement {
    actions = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    effect  = "Allow"

    resources = [
      "${aws_s3_bucket.uploaded_assets.arn}/public/*",
      "${aws_s3_bucket.uploaded_assets.arn}/protected/$${cognito-identity.amazonaws.com:sub}/*",
      "${aws_s3_bucket.uploaded_assets.arn}/private/$${cognito-identity.amazonaws.com:sub}/*",
    ]
  }

  statement {
    actions = ["s3:GetObject"]
    effect  = "Allow"

    resources = [
      "${aws_s3_bucket.uploaded_assets.arn}/protected/*",
    ]
  }

  statement {
    actions = ["s3:ListBucket"]
    effect  = "Allow"

    resources = [
      "${aws_s3_bucket.uploaded_assets.arn}",
    ]

    condition {
      test     = "StringLike"
      variable = "s3:prefix"

      values = [
        "public/",
        "public/*",
        "protected/",
        "protected/*",
        "private/$${cognito-identity.amazonaws.com:sub}/",
        "private/$${cognito-identity.amazonaws.com:sub}/*",
      ]
    }
  }
}

resource "aws_iam_policy" "uploaded_assets_access" {
  name   = "${var.project_name}_uploaded_assets_access"
  policy = "${data.aws_iam_policy_document.uploaded_assets_access.json}"
}

resource "aws_iam_role_policy_attachment" "uploaded_assets_access" {
  role       = "${aws_iam_role.auth.name}"
  policy_arn = "${aws_iam_policy.uploaded_assets_access.arn}"
}

data "aws_iam_policy_document" "unauth_role_policy" {
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

      values = ["unauthenticated"]
    }
  }
}

resource "aws_iam_role" "unauth" {
  name               = "${var.project_name}_unauth_role"
  assume_role_policy = "${data.aws_iam_policy_document.unauth_role_policy.json}"
  tags               = "${var.default_tags}"
}

resource "aws_cognito_identity_pool" "main" {
  identity_pool_name               = "${var.project_name}_identity_pool"
  allow_unauthenticated_identities = true
  tags                             = "${var.default_tags}"

  cognito_identity_providers {
    client_id     = "${aws_cognito_user_pool_client.client_web.id}"
    provider_name = "${aws_cognito_user_pool.main.endpoint}"
  }
}

resource "aws_cognito_identity_pool_roles_attachment" "main" {
  identity_pool_id = "${aws_cognito_identity_pool.main.id}"

  roles = {
    "authenticated"   = "${aws_iam_role.auth.arn}"
    "unauthenticated" = "${aws_iam_role.unauth.arn}"
  }
}
