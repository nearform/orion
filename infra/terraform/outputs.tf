output "domain_name" {
  value = "${aws_route53_record.knowledgebase.name}"
}

output "CI_AWS_ACCESS_KEY_ID" {
  value = "${aws_iam_access_key.ci_user.id}"
}

output "CI_AWS_SECRET_ACCESS_KEY" {
  value = "${aws_iam_access_key.ci_user.secret}"
}
