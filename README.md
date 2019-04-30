# NearForm 🤓 raw-salmon

[![CircleCI](https://circleci.com/gh/nearform/raw-salmon.svg?style=svg&circle-token=0ce58bd80ab2db1fd16b1eca28dba58c62588a74)](https://circleci.com/gh/nearform/raw-salmon)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

This repository is a collection of packages that can be used as a foundation for a statically built, GraphQL-driven platform.

## Architecture

The project architecture follows a JAMStack, Serverless application model. The picture shows a high level architecture diagram.

![architecture](./docs/architecture.png)

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

## Project structure

The application is stored in a [lerna](https://github.com/lerna/lerna) monorepo.

### [./.circleci](./.circleci)

CircleCI [project](https://circleci.com/gh/nearform/raw-salmon) continuous integration configuration.

### [./hasura](./hasura)

The application follows a serverless application model, where the only API used by the frontend is exposed through GraphQL via [Hasura](https://hasura.io).

This folder contains the migrations and scripts necessary to run them.

### [./packages/components](./packages/components)

> note, this package is currently, temporarily unused until we sort out the direction we want to go with the design system

- a component library based on [styled-components](https://www.styled-components.com/)
- a design system with a `ThemeProvider` approach to theming and using
  [saluki](https://github.com/nearform/saluki) for its CSS-in-JS modular
  approach with sane defaults similar in concept to [tailwind](https://tailwindcss.com/docs/what-is-tailwind/)

### [./packages/app](./packages/app)

- a static build enabled app based on [gatsby](https://www.gatsbyjs.org)
- Gatsby uses [graphql](https://graphql.org/) to fetch data from the API

### [./packages/nearform-theme](./packages/nearform-theme)
### [./packages/efqm-theme](./packages/efqm-theme)

- branding customizations
- material-ui themes
- wrapper components to apply common styles to the application
- theme configuration
- assets

### [./packages/functions](./packages/functions)

- lambda serverless functions used to interact with AWS Cognito and Hasura

## Project setup

### 1. Clone and install dependencies

```
git clone https://github.com/nearform/raw-salmon.git

cd raw-salmon

npm i
```

### 2. Configure

Most of the configuration comes from environment variables. Required environment variables for each part of the architecture are documented in the `.env.sample` files inside the repository.

- app [`.env.sample`](./packages/app/.env.sample) - build time environment variables for the Gatsby application. They should also be configured in CI, along with any other environment variables required by CI
- hasura [`.env.sample`](./hasura/.env.sample) - runtime environment variables for Hasura and Hasura console. They need to be configured when running Hasura or Hasura console.
- functions [`.env.sample`](./packages/functions/.env.sample) - runtime environment variables for AWS Lambda functions.

Shared secrets are stored in a vault. Get in touch with a team member to get access to it.

## Contributing

1. Clone the project.
2. Pick an issue to work on from the project board.
3. Work on a new branch using the convention `{change type}/{change name}`. For instance `feature/signup-form` or `fix/broken-signup form`.
4. Commit changes using conventional commits via Commitizen: `git cz`. This requires installing [Commitizen](http://commitizen.github.io/cz-cli/) first.
5. Reference the issue in the commit message (the conventional commits wizard prompts for that at some point), for instance `Fixes #12`. Doing this, GitHub will close the issue once the PR that references it in this way gets merged.
5. Create a pull request and get someone to review it.
6. Once approved, you as the author of the PR should merge it.

## Running the application

Ensure you have a local `.env.development` file available.

```
cd packages/app
npm start
```

## Storybook

The components package contains storybook stories to document and test the components contained therein.

A hosted version of the storybook stories is running at https://raw-salmon-storybook.nearform.com

```
cd packages/components
npm run storybook
```
