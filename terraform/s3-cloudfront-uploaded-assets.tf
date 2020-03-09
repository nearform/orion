resource "aws_route53_record" "uploaded_assets" {
  zone_id = "${data.aws_route53_zone.primary.zone_id}"
  name    = "${var.cf_uploaded_assets_domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.uploaded_assets.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.uploaded_assets.hosted_zone_id}"
    evaluate_target_health = true
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_s3_bucket" "uploaded_assets" {
  bucket = "${var.cf_uploaded_assets_domain_name}"
  acl    = "private"
  tags   = "${var.default_tags}"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["HEAD", "GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"]
    expose_headers  = ["x-amz-server-side-encryption", "x-amz-request-id", "x-amz-id-2", "ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_cloudfront_origin_access_identity" "uploaded_assets" {
  comment = "Access identity for static_pages_cloudfront_distribution"
}

resource "aws_cloudfront_distribution" "uploaded_assets" {
  origin {
    domain_name = "${aws_s3_bucket.uploaded_assets.bucket_domain_name}"
    origin_id   = "${var.cf_uploaded_assets_domain_name}_origin"

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/${aws_cloudfront_origin_access_identity.uploaded_assets.id}"
    }
  }

  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_200"
  retain_on_delete    = false
  aliases             = ["${var.cf_uploaded_assets_domain_name}"]
  tags                = "${var.default_tags}"

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.cf_uploaded_assets_domain_name}_origin"

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

data "aws_iam_policy_document" "uploaded_assets_s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.uploaded_assets.arn}/public/uploads/articles/*", "${aws_s3_bucket.uploaded_assets.arn}/public/uploads/users/*"]

    principals = {
      type        = "AWS"
      identifiers = ["*"]
    }
  }

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.uploaded_assets.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.uploaded_assets.iam_arn}"]
    }
  }

  statement {
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.uploaded_assets.arn}/public/uploads/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.uploaded_assets.iam_arn}"]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.uploaded_assets.arn}"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.uploaded_assets.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket_policy" "uploaded_assets_allow_cf" {
  bucket = "${aws_s3_bucket.uploaded_assets.id}"
  policy = "${data.aws_iam_policy_document.uploaded_assets_s3_policy.json}"
}
