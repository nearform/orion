# Terraform IaC

## Configure the AWS CLI

1. [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
2. Create an AWS profile in your local AWS configuration (`~/.aws/*`) with [access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) of a user with right permissions for provisioning resources mentioned in **Components** section below.
```sh
$ aws configure --profile knowledgebase
AWS Access Key ID [None]: AK*********E
AWS Secret Access Key [None]: je7M***************EY
Default region name [None]: eu-west-1
Default output format [None]: text
```

3. set aws cli to use `knowledgebase` AWS profile:
```sh
export AWS_PROFILE=knowledgebase
```

## Create an S3 bucket for terraform state (on first provisioning only)

1. Create a bucket:
```sh
aws s3api create-bucket --bucket knowledgebase-tf-state --region eu-west-1 --create-bucket-configuration LocationConstraint=eu-west-1
```
2. Enable versioning on the bucket:
```sh
aws s3api put-bucket-versioning --bucket knowledgebase-tf-state --versioning-configuration Status=Enabled
```

## Terraform provisioning

1. Install [Terraform](https://www.terraform.io/downloads.html)
2. Init Terraform:
```sh
terraform init -backend-config="bucket=knowledgebase-tf-state" -backend-config="key=terraform.tfstate" -backend-config="region=eu-west-1"
```
3. Rename `sample.tfvars` to `input.tfvars` and fill in missing secrets:
4. Provision the infrastructure:
```sh
terraform apply -var-file input.tfvars
```

