data "aws_iam_policy_document" "sub_dirs_lambda" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"

      identifiers = [
        "lambda.amazonaws.com",
        "edgelambda.amazonaws.com",
      ]
    }
  }
}

resource "aws_iam_role" "sub_dirs" {
  name               = "${var.project_name}_sub_dirs"
  assume_role_policy = "${data.aws_iam_policy_document.sub_dirs_lambda.json}"
  tags               = "${var.default_tags}"
}

resource "aws_iam_role_policy_attachment" "sub_dirs_basic" {
  role       = "${aws_iam_role.sub_dirs.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "template_file" "sub_dirs" {
  template = "${file("${path.module}/lambda_src/sub_dirs.js")}"
}

data "archive_file" "sub_dirs_lambda_fnc" {
  type        = "zip"
  output_path = "${path.root}/.zip/${var.project_name}_sub_dirs.zip"

  source {
    filename = "index.js"
    content  = "${data.template_file.sub_dirs.rendered}"
  }
}

resource "aws_lambda_function" "sub_dirs" {
  provider         = "aws.us_east_1"
  function_name    = "${var.project_name}_sub_dirs"
  filename         = "${substr(data.archive_file.sub_dirs_lambda_fnc.output_path, length(path.cwd) + 1, -1)}"
  source_code_hash = "${data.archive_file.sub_dirs_lambda_fnc.output_base64sha256}"
  role             = "${aws_iam_role.sub_dirs.arn}"
  runtime          = "nodejs10.x"
  handler          = "index.handler"
  memory_size      = 128
  timeout          = 3
  publish          = true
  tags             = "${var.default_tags}"

  lifecycle {
    create_before_destroy = true
  }
}
