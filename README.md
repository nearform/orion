# NearForm 🍣 raw-salmon

[![CircleCI](https://circleci.com/gh/nearform/raw-salmon.svg?style=svg&circle-token=0ce58bd80ab2db1fd16b1eca28dba58c62588a74)](https://circleci.com/gh/nearform/raw-salmon)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

This repository is a collection of packages that can be used as a foundation for a statically built, GraphQL-driven knowledge platform.

## Quick Start

To get started quickly, check out these useful links:

- [Documentation](https://nearform.github.io/raw-salmon)
- [Demo](https://raw-salmon.nearform.com)
- [Storybook](https://raw-salmon-storybook.nearform.com)

## Repo structure

The application is stored in a [lerna](https://github.com/lerna/lerna) monorepo.

### [./.circleci](./.circleci)

CircleCI [project](https://circleci.com/gh/nearform/raw-salmon) continuous integration configuration.

### [./packages/hasura](./packages/hasura)

The application follows a serverless application model, where the only API used by the frontend is exposed through GraphQL via [Hasura](https://hasura.io).

This folder contains the migrations and scripts necessary to run them.

### [./packages/assess-base-hasura](./packages/assess-base-hasura)

This package contains the assess-base specific Hasura schema and metatada.

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

### [./packages/e2e-tests](./packages/e2e-tests)

End-to-end tests using TestCafe. Requires environment variables to run, see
[the Quick Start Guide](/docs/quick-start#2-configure). For more details see [the Tests docs](/docs/tests#end-to-end-tests).


