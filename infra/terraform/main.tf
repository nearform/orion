provider "aws" {
  version = "~> 1.55"
  region  = "${var.aws_region}"
}

provider "aws" {
  version = "~> 1.55"
  alias   = "us_east_1"
  region  = "us-east-1"
}

data "aws_route53_zone" "primary" {
  name         = "${var.route53_zone}"
  private_zone = false
}
