// Defines environment variables for build and runtime for orion

/*
    These ones are for building the artifacts
    BUILD=${CIRCLE_BUILD_NUM}
    ORG=orion
    GATSBY_GRAPHQL_API=ORION_GATSBY_GRAPHQL_API
    GATSBY_AWS_REGION=ORION_GATSBY_AWS_REGION
    GATSBY_AWS_COGNITO_IDENTITY_POOL_ID=ORION_GATSBY_AWS_COGNITO_IDENTITY_POOL_ID
    GATSBY_AWS_COGNITO_USER_POOL_ID=ORION_GATSBY_AWS_COGNITO_USER_POOL_ID
    GATSBY_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID=ORION_GATSBY_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID
    GATSBY_AWS_S3_BUCKET=ORION_GATSBY_AWS_S3_BUCKET
    HASURA_GRAPHQL_ADMIN_SECRET=ORION_HASURA_GRAPHQL_ADMIN_SECRET
*/

resource "aws_ssm_parameter" "gatsby_graphql_api" {
  name  = "/${var.org}/GATSBY_GRAPHQL_API"
  type  = "SecureString"
  value = "${var.gatsby_graphql_api}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "gatsby_aws_region" {
  name  = "/${var.org}/GATSBY_AWS_REGION"
  type  = "SecureString"
  value = "${var.gatsby_aws_region}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "gatsby_aws_cognito_identity_pool_id" {
  name  = "/${var.org}/GATSBY_AWS_COGNITO_IDENTITY_POOL_ID"
  type  = "SecureString"
  value = "${var.gatsby_aws_cognito_identity_pool_id}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "gatsby_aws_cognito_user_pool_id" {
  name  = "/${var.org}/GATSBY_AWS_COGNITO_USER_POOL_ID"
  type  = "SecureString"
  value = "${var.gatsby_aws_cognito_user_pool_id}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "gatsby_aws_cognito_user_pool_web_client_id" {
  name  = "/${var.org}/GATSBY_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID"
  type  = "SecureString"
  value = "${var.gatsby_aws_cognito_user_pool_web_client_id}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "gatsby_aws_s3_bucket" {
  name  = "/${var.org}/GATSBY_AWS_S3_BUCKET"
  type  = "SecureString"
  value = "${var.gatsby_aws_s3_bucket}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "HASURA_GRAPHQL_ENDPOINT" {
  name  = "/${var.org}/HASURA_GRAPHQL_ENDPOINT"
  type  = "SecureString"
  value = "https://${var.hasura_domain_name}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "HASURA_GRAPHQL_ADMIN_SECRET" {
  name  = "/${var.org}/HASURA_GRAPHQL_ADMIN_SECRET"
  type  = "SecureString"
  value = "${var.HASURA_GRAPHQL_ADMIN_SECRET}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "s3_deploy_artifacts" {
  name  = "/${var.org}/s3_deploy_artifacts"
  type  = "SecureString"
  value = "${var.s3_deploy_artifacts}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "admin_app_bucket" {
  name  = "/${var.org}/admin_app_bucket"
  type  = "SecureString"
  value = "${var.cf_admin_app_domain_name}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "edit_app_bucket" {
  name  = "/${var.org}/edit_app_bucket"
  type  = "SecureString"
  value = "${var.cf_edit_app_domain_name}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "view_app_bucket" {
  name  = "/${var.org}/view_app_bucket"
  type  = "SecureString"
  value = "${var.cf_view_app_domain_name}"
  tags  = "${var.default_tags}"
}

resource "aws_ssm_parameter" "storybook_bucket" {
  name  = "/${var.org}/storybook_bucket"
  type  = "SecureString"
  value = "${var.cf_storybook_domain_name}"
  tags  = "${var.default_tags}"
}
