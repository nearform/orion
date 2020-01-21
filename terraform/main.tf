terraform {
  required_version = ">= 0.11.8"
  backend          "s3"             {}
}

provider "aws" {
  version = "~> 2.30"
  region  = "${var.aws_region}"
  profile = "orion"
}

provider "aws" {
  version = "~> 2.30"
  alias   = "us_east_1"
  region  = "us-east-1"
  profile = "orion"
}

data "aws_route53_zone" "primary" {
  name         = "${var.route53_zone}"
  private_zone = false
}
