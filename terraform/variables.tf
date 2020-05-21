variable "aws_region" {
  description = "The AWS region to create things in."

  default = "eu-west-1"
}

variable "route53_zone" {
  description = "Route53 zone used for DNS validation of issuing SSL certificate"
}

variable "project_name" {
  description = "App name used in resource names as prefix"
}

variable "vpc_az_count" {
  description = "VPC count of availability zones"
}

variable "cf_edit_app_domain_name" {
  description = "Domain name used for gatsby-plugin-orion-edit Cloudfront"
}

variable "cf_view_app_domain_name" {
  description = "Domain name used for gatsby-plugin-orion-view Cloudfront"
}

variable "cf_uploaded_assets_domain_name" {
  description = "Domain name used for Uploaded assets Cloudfront"
}

variable "cf_storybook_domain_name" {
  description = "Domain name used for Storybook Cloudfront"
}

variable "cf_wildcard_domain_name" {
  description = "Domain name used for SSL"
}

variable "ci_user_name" {
  description = "IAM user name for CI"
}

variable "rds_identifier" {
  description = "RDS Identifier"
}

variable "rds_db_name" {
  description = "RDS Database name"
}

variable "rds_password" {
  description = "Password for the master DB user. Note that this may show up in logs, and it will be stored in the state file"
}

variable "hasura_domain_name" {
  description = "Domain name used for Hasura"
}

variable "hasura_port" {
  description = "Port of Hasura app"
}

variable "HASURA_GRAPHQL_ADMIN_SECRET" {
  description = "HASURA_GRAPHQL_ADMIN_SECRET"
}

variable "HASURA_GRAPHQL_UNAUTHORIZED_ROLE" {
  description = "HASURA_GRAPHQL_UNAUTHORIZED_ROLE"
}

variable "HASURA_GRAPHQL_ENABLE_CONSOLE" {
  description = "HASURA_GRAPHQL_ENABLE_CONSOLE"
}

variable "http_basic_auth_username" {
  description = "storybook http basic auth username"
}

variable "http_basic_auth_password" {
  description = "storybook http basic auth password"
}

variable "s3_deploy_artifacts" {
  description = "Bucket to be used for holding deploy artifacts"
}

variable "org" {
  description = "organization for parameter-store variables, defines variable names in parameter store"
}

variable "gatsby_graphql_api" {
  description = "gatsby_graphql_api"
}

variable "gatsby_aws_region" {
  description = "gatsby_aws_region"
}

variable "gatsby_aws_cognito_identity_pool_id" {
  description = "gatsby_aws_cognito_identity_pool_id"
}

variable "gatsby_aws_cognito_user_pool_id" {
  description = "gatsby_aws_cognito_user_pool_id"
}

variable "gatsby_aws_cognito_user_pool_web_client_id" {
  description = "gatsby_aws_cognito_user_pool_web_client_id"
}

variable "gatsby_aws_s3_bucket" {
  description = "gatsby_aws_s3_bucket"
}

variable "alarms_enabled" {
  description = "Enables Cloudwatch Alarms + SNS Notifications"
  default     = false
}

variable "alarms_slack_notification_webhook" {
  description = "Slack URL webhook"
  default     = ""
}

variable "default_tags" {
  description = "Default tags added to all resources"
  default     = {}
}
