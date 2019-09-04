![icon]

## What is this?

This is the home to a knowledgebase and self assessment business tool. It is being created to be a generic reusable solution that can be self hosted and customised to individual needs. The project architecture follows a JAMStack, Serverless application model. This tool is built using [Gatsby] on top of the following technologies using [AWS Cognito](Cognito) for auth, [AWS S3](S3) for asset storage, hosted [PostgreSQL] on [AWS RDS](RDS) for data storage, [Hasura] to create a [GraphQL] api over postgres, and [AWS Lambda](Lambda) functions to tie it all together.

To deploy this application, Gatsby assets are stored on S3 and served via [AWS Cloudfront CDN](Cloudfront). [AWS Route53](Route53) is used for DNS mapping the hostname to the assets internally.

[Terraform] is used to manage all of this infrastructure.

See this image:

![architecture-overview]

## Project vision

The objective of the project is to build a more flexible platform, capable of accommodating a quandrant of requirements running on two axis:

- feature wise, a knowledgebase and an assess-base
- branding wise, internal NearForm projects and customer projects

The end goal is to support all the variation on such axis:

- NearForm cloud native knowledgebase and assess-base
- EFQM knowledge base and assess-base

The initial goal is to implement the EFQM assess-base, followed closely by the EFQM knowlegebase, while at the same time creating the platform to accommodate a non-EFQM version of both, with all that it entails.

At a high level, the architecture of the project will have a single **host Web application built with Gatsby**, where branding customizations for a same brand (we don't expect to host within the same runtime instance of an application multiple brands) occur via a **theme** package which contains:

- UI customizations via Material UI themes
- application-wide specific configuration (i.e. assessment configuration)
- translations

Also, the  idea is that knowledgebase and assess-base specific code, including:

- site-specific components
- site-specific database schema and metadata

will live in **Gatsby theme packages**, a new feature recently introduced in Gatsby, and still experimental, which allows to compose a Gatsby application via multiple modules which collaborate with each other, rather than being constrained to a single application per Gatsby host as is the case with the usual Gatsby starter projects.

### Implementing an application with the platform

All the above considered, the objective is to make it possible to implemented either or both a knowledgebase application and an assess-base application by:

- creating a plain Gatsby application
- using Gatsby theme packages published by NearForm
- customizing the look and behavior of the application(s) via a brand-specific theme package provided by the implementor and following well-defined and documented configuration procedures, including:
  - providing assets to show in the UI of the application
  - customizing the look via Material UI theme configuration
  - providing configuration for the assessments available in the assess base
  - ....

[See here for a quick start guide](quick-start/)

<!-- External Links -->
[Gatsby]: https://www.gatsbyjs.org/
[Cognito]: https://aws.amazon.com/cognito/
[S3]: https://aws.amazon.com/s3/
[PostgreSQL]: https://www.postgresql.org/
[RDS]: https://aws.amazon.com/rds/
[Hasura]: https://hasura.io/
[GraphQL]: https://graphql.org/learn/
[Lambda]: https://aws.amazon.com/lambda/
[Cloudfront]: https://aws.amazon.com/cloudfront/
[Route53]: https://aws.amazon.com/route53/
[Terraform]: https://www.terraform.io/

<!-- Images -->
[icon]: images/Accel_Logo_Orion.svg#logo
[architecture-overview]: images/architecture.png
