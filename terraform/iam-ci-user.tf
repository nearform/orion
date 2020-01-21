resource "aws_iam_user" "ci_user" {
  name = "${var.ci_user_name}"
  tags = "${merge(var.default_tags, map("Name", "${var.project_name}"))}"
}

resource "aws_iam_access_key" "ci_user" {
  user = "${aws_iam_user.ci_user.name}"
}

resource "aws_iam_user_policy_attachment" "acr_attach" {
  user       = "${aws_iam_user.ci_user.name}"
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"
}

data "aws_iam_policy_document" "s3_bucket_access" {
  statement {
    actions = [
      "s3:*",
    ]

    resources = [
      "arn:aws:s3:::${var.cf_app_domain_name}",
      "arn:aws:s3:::${var.cf_app_domain_name}/*",
      "arn:aws:s3:::${var.cf_storybook_domain_name}",
      "arn:aws:s3:::${var.cf_storybook_domain_name}/*",
      "arn:aws:s3:::${var.s3_deploy_artifacts}",
      "arn:aws:s3:::${var.s3_deploy_artifacts}/*",
    ]
  }

  statement {
    actions = [
      "ecs:UpdateService",
    ]

    resources = [
      "*",
    ]
  }

  statement {
    actions = [
      "lambda:*",
    ]

    resources = [
      "arn:aws:lambda:*:*:function:${aws_lambda_function.signup_hook.function_name}",
      "arn:aws:lambda:*:*:function:${aws_lambda_function.jwt_enrichment_hook.function_name}",
    ]
  }
}

resource "aws_iam_user_policy" "s3-policy" {
  name   = "s3-bucket-access"
  user   = "${aws_iam_user.ci_user.name}"
  policy = "${data.aws_iam_policy_document.s3_bucket_access.json}"
}

data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "parameter_store_access" {
  statement {
    effect = "Allow"

    actions = [
      "ssm:GetParameterHistory",
      "ssm:ListTagsForResource",
      "ssm:GetParametersByPath",
      "ssm:GetParameters",
      "ssm:GetParameter",
      "ssm:PutParameter",
    ]

    resources = [
      "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:*",
    ]
  }
}

resource "aws_iam_user_policy" "paramstore-policy" {
  name   = "parameter-store-access"
  user   = "${aws_iam_user.ci_user.name}"
  policy = "${data.aws_iam_policy_document.parameter_store_access.json}"
}
