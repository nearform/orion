resource "aws_acm_certificate" "cf_wildcard_cert" {
  provider          = "aws.us_east_1"
  domain_name       = "${var.cf_wildcard_domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cf_wildcard_cert" {
  name            = "${aws_acm_certificate.cf_wildcard_cert.domain_validation_options.0.resource_record_name}"
  type            = "${aws_acm_certificate.cf_wildcard_cert.domain_validation_options.0.resource_record_type}"
  zone_id         = "${data.aws_route53_zone.primary.id}"
  records         = ["${aws_acm_certificate.cf_wildcard_cert.domain_validation_options.0.resource_record_value}"]
  ttl             = 60
  allow_overwrite = true

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cf_wildcard_cert" {
  provider                = "aws.us_east_1"
  certificate_arn         = "${aws_acm_certificate.cf_wildcard_cert.arn}"
  validation_record_fqdns = ["${aws_route53_record.cf_wildcard_cert.fqdn}"]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "wildcard_cert" {
  domain_name       = "${var.cf_wildcard_domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  name            = "${aws_acm_certificate.wildcard_cert.domain_validation_options.0.resource_record_name}"
  type            = "${aws_acm_certificate.wildcard_cert.domain_validation_options.0.resource_record_type}"
  zone_id         = "${data.aws_route53_zone.primary.id}"
  records         = ["${aws_acm_certificate.wildcard_cert.domain_validation_options.0.resource_record_value}"]
  ttl             = 60
  allow_overwrite = true

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "wildcard_cert" {
  certificate_arn         = "${aws_acm_certificate.wildcard_cert.arn}"
  validation_record_fqdns = ["${aws_route53_record.cert_validation.fqdn}"]

  lifecycle {
    create_before_destroy = true
  }
}
