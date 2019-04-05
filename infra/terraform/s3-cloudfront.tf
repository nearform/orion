resource "aws_route53_record" "knowledgebase" {
  zone_id = "${data.aws_route53_zone.primary.zone_id}"
  name    = "${var.cf_domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.knowledgebase.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.knowledgebase.hosted_zone_id}"
    evaluate_target_health = true
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_s3_bucket" "knowledgebase" {
  bucket = "${var.cf_domain_name}"
  acl    = "private"
}

resource "aws_cloudfront_origin_access_identity" "knowledgebase" {
  comment = "Access identity for static_pages_cloudfront_distribution"
}

resource "aws_cloudfront_distribution" "knowledgebase" {
  origin {
    domain_name = "${aws_s3_bucket.knowledgebase.bucket_domain_name}"
    origin_id   = "${var.cf_domain_name}_origin"

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/${aws_cloudfront_origin_access_identity.knowledgebase.id}"
    }
  }

  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_200"
  retain_on_delete    = false
  aliases             = ["${var.cf_domain_name}"]

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
    target_origin_id = "${var.cf_domain_name}_origin"

    # lambda_function_association {
    #   event_type = "viewer-request"
    #   lambda_arn = "${aws_lambda_function.sub_dirs.qualified_arn}"
    # }

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
}

data "aws_iam_policy_document" "knowledgebase_s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.knowledgebase.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.knowledgebase.iam_arn}"]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.knowledgebase.arn}"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.knowledgebase.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket_policy" "knowledgebase_allow_cf" {
  bucket = "${aws_s3_bucket.knowledgebase.id}"
  policy = "${data.aws_iam_policy_document.knowledgebase_s3_policy.json}"
}
