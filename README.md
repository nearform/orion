[![Logo][logo-img]][docs]

[![CircleCI](https://circleci.com/gh/nearform/orion.svg?style=svg&circle-token=0ce58bd80ab2db1fd16b1eca28dba58c62588a74)](https://circleci.com/gh/nearform/orion)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

This repository is a collection of packages that can be used as a foundation for a statically built, GraphQL-driven knowledge platform.

## Installation

The project is structured as a monorepo and uses [Yarn](https://yarnpkg.com/lang/en/) and [Yarn workspaces](https://yarnpkg.com/en/docs/workspaces) for dependency management.

For initial setup use `yarn install`.

To install the project's package dependencies use `yarn run bootstrap`.

To clean the project's package dependencies use `yarn run clean`.

## Quick Start

To get started quickly, check out these useful links:

- [Documentation][docs]
- [Demo](https://orion.nearform.com)
- [Storybook](https://orion-storybook.nearform.com)

## Repo structure

The application is stored in a [lerna](https://github.com/lerna/lerna) monorepo.

### [./.circleci](./.circleci)

CircleCI [project](https://circleci.com/gh/nearform/orion) continuous integration configuration.

### [./packages/hasura](./packages/hasura)

The application follows a serverless application model, where the only API used by the frontend is exposed through GraphQL via [Hasura](https://hasura.io).

This folder contains the migrations and scripts necessary to run them.

### [./packages/components](./packages/components)

- a component library based on [styled-components](https://www.styled-components.com/)
- a design system with a `ThemeProvider` approach to theming and using
  [saluki](https://github.com/nearform/saluki) for its CSS-in-JS modular
  approach with sane defaults similar in concept to [tailwind](https://tailwindcss.com/docs/what-is-tailwind/)

### [./packages/knowledge-base](./packages/knowledge-base)

- a static build enabled app based on [gatsby](https://www.gatsbyjs.org)
- Gatsby uses [graphql](https://graphql.org/) to fetch data from the API
- exports commonjs logic and config

### [./packages/nearform-theme](./packages/nearform-theme)

### [./packages/efqm-theme](./packages/efqm-theme)

- branding customizations
- material-ui themes
- wrapper components to apply common styles to the application
- theme configuration
- assets

### [./packages/functions](./packages/functions)

- lambda serverless functions used to interact with AWS Cognito and Hasura

### [./packages/e2e-tests](./packages/e2e-tests)

End-to-end tests using TestCafe. Requires environment variables to run, see
[the Quick Start Guide](/docs/quick-start#2-configure). For more details see [the Tests docs](/docs/tests#end-to-end-tests).

[logo-img]: docs/images/Accel_Logo_Orion.svg
[docs]: https://nearform.github.io/orion
