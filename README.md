[![Logo][logo-img]][docs]

[![CircleCI](https://circleci.com/gh/nearform/orion.svg?style=svg&circle-token=0ce58bd80ab2db1fd16b1eca28dba58c62588a74)](https://circleci.com/gh/nearform/orion)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Orion is a bespoke CMS development kit, offering developers packages and capabilities that accelerate the process in developing content-driven solutions.

## Tech Stack

Bundlers and Package Managers
  * Webpack (https://webpack.js.org/)
  * Lerna (https://github.com/lerna/lerna)
  * Yarn (https://yarnpkg.com/lang/en/)
  
Languages and Frameworks
  * JavaScript (https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  * React (https://reactjs.org/)
  * Gatsby (https://www.gatsbyjs.org/)
  * Material-UI (https://material-ui.com/)
  
Datastore and Languages
  * Hasura (https://hasura.io/)
  * GraphQL (https://graphql.org/)
  * PostgreSQL (https://www.postgresql.org/)

Linting
  * XO (https://github.com/xojs/xo)
  * Prettier (https://prettier.io/)

Testing
  * Jest (https://jestjs.io/)
  * React Testing Library
  * Cypress

CI and Deployment
  * CircleCI (https://circleci.com)
  * Github Actions (https://help.github.com/en/actions)

Logging and Debugging
  * LogLevel (https://github.com/pimterry/loglevel)
  * Default Node.js Debugging for Chrome (https://medium.com/the-node-js-collection/debugging-node-js-with-google-chrome-4965b5f910f4)



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


### [./packages/functions](./packages/functions)

- lambda serverless functions used to interact with AWS Cognito and Hasura

### [./packages/e2e-tests](./packages/e2e-tests)

End-to-end tests using TestCafe. Requires environment variables to run, see
[the Quick Start Guide](/docs/quick-start#2-configure). For more details see [the Tests docs](/docs/tests#end-to-end-tests).

[logo-img]: docs/images/Accel_Logo_Orion.svg
[docs]: https://nf-orion.netlify.com/#/
