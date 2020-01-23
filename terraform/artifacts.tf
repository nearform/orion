resource "aws_s3_bucket" "deploy_artifacts" {
  bucket = "${var.s3_deploy_artifacts}"
  acl    = "private"
}
