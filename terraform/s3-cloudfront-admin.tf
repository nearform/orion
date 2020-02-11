resource "aws_route53_record" "admin_app" {
  zone_id = "${data.aws_route53_zone.primary.zone_id}"
  name    = "${var.cf_admin_app_domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.admin_app.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.admin_app.hosted_zone_id}"
    evaluate_target_health = true
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_s3_bucket" "admin_app" {
  bucket = "${var.cf_admin_app_domain_name}"
  acl    = "private"
  tags   = "${var.default_tags}"
}

resource "aws_cloudfront_origin_access_identity" "admin_app" {
  comment = "Access identity for static_pages_cloudfront_distribution"
}

resource "aws_cloudfront_distribution" "admin_app" {
  origin {
    domain_name = "${aws_s3_bucket.admin_app.bucket_domain_name}"
    origin_id   = "${var.cf_admin_app_domain_name}_origin"

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/${aws_cloudfront_origin_access_identity.admin_app.id}"
    }
  }

  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_200"
  retain_on_delete    = false
  aliases             = ["${var.cf_admin_app_domain_name}"]
  tags                = "${var.default_tags}"

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 404
    response_page_path    = "${var.cf_not_found_path}"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 404
    response_page_path    = "${var.cf_not_found_path}"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.cf_admin_app_domain_name}_origin"

    lambda_function_association {
      event_type = "viewer-request"
      lambda_arn = "${aws_lambda_function.http_auth.qualified_arn}"
    }

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  viewer_certificate {
    acm_certificate_arn = "${aws_acm_certificate_validation.cf_wildcard_cert.certificate_arn}"
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  wait_for_deployment = false
}

data "aws_iam_policy_document" "admin_app_s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.admin_app.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.admin_app.iam_arn}"]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.admin_app.arn}"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.admin_app.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket_policy" "admin_app_allow_cf" {
  bucket = "${aws_s3_bucket.admin_app.id}"
  policy = "${data.aws_iam_policy_document.admin_app_s3_policy.json}"
}
