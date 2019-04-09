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

variable "cf_domain_name" {
  description = "Domain name used for Cloudfront"
}

variable "cf_wildcard_domain_name" {
  description = "Domain name used for SSL"
}

variable "cf_not_found_path" {
  description = "Path to 404 html page"
}

variable "ci_user_name" {
  description = "IAM user name for CI"
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

variable "HASURA_GRAPHQL_DATABASE_URL" {
  description = "HASURA_GRAPHQL_DATABASE_URL"
}

variable "HASURA_GRAPHQL_ADMIN_SECRET" {
  description = "HASURA_GRAPHQL_ADMIN_SECRET"
}

variable "HASURA_GRAPHQL_ENABLE_CONSOLE" {
  description = "HASURA_GRAPHQL_ENABLE_CONSOLE"
}

variable "HASURA_GRAPHQL_JWT_SECRET" {
  description = "HASURA_GRAPHQL_JWT_SECRET"
}

variable "HASURA_GRAPHQL_API" {
  description = "HASURA_GRAPHQL_API"
}
