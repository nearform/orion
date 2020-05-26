[![Logo][logo-img]][docs]

[![CircleCI](https://circleci.com/gh/nearform/orion.svg?style=svg&circle-token=0ce58bd80ab2db1fd16b1eca28dba58c62588a74)](https://circleci.com/gh/nearform/orion)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Orion is a bespoke CMS development kit, offering developers packages and capabilities that accelerate the process in developing content-driven solutions.

## Tech Stack

Bundlers and Package Managers

- Webpack (https://webpack.js.org/)
- Lerna (https://github.com/lerna/lerna)
- Yarn (https://yarnpkg.com/lang/en/)

Languages and Frameworks

- JavaScript (https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- React (https://reactjs.org/)
- Gatsby (https://www.gatsbyjs.org/)
- Material-UI (https://material-ui.com/)
- Styled Components (https://www.styled-components.com/)

Datastore and Languages

- Hasura (https://hasura.io/)
- GraphQL (https://graphql.org/)
- PostgreSQL (https://www.postgresql.org/)

Linting

- XO (https://github.com/xojs/xo)
- Prettier (https://prettier.io/)

Testing

- Jest (https://jestjs.io/)
- React Testing Library
- Cypress

CI and Deployment

- CircleCI (https://circleci.com)
- Github Actions (https://help.github.com/en/actions)

Logging and Debugging

- LogLevel (https://github.com/pimterry/loglevel)
- Default Node.js Debugging for Chrome (https://medium.com/the-node-js-collection/debugging-node-js-with-google-chrome-4965b5f910f4)

## Installation

The project is structured as a monorepo and uses [Yarn](https://yarnpkg.com/lang/en/) and [Yarn workspaces](https://yarnpkg.com/en/docs/workspaces) for dependency management.

For initial setup use `yarn install`.

To install the project's package dependencies use `yarn run bootstrap`.

To clean the project's package dependencies use `yarn run clean`.

## Environment variables

This project uses .env files for environment variables.

To get the environment variable setup for local development you will need

- .env.development files need to added to gatsby-plugin-orion-view and gatsby-plugin-orion-edit.
- A .env file needs to added to the hasura package.

The content of the files can be found on clipperz.is

## Quick Start

To get started quickly, check out these useful links:

- [QuickStart](https://github.com/nearform/orion/tree/master/docs/quick-start)
- [Documentation][docs]
- [Demo](https://orion.nearform.com)
- [Storybook](https://orion-storybook.nearform.com)

## Repo structure

The application is stored in a [lerna](https://github.com/lerna/lerna) monorepo.

### Adding a new package

When making a new package we want to make sure that gatsby doesn’t do its own linting with eslint but rather uses the root level config from XO. Do do this you need an empty eslintrc.js file.

```lang javascript
// We use xo configured in the root of the monorepo. Disable eslint for gatsby.
module.exports = {}
```

Some packages are marked as `Legacy Package`. This marking indicates that they have been brought over from a previous
client-based project as part of transitioning that project into the Orion Accelerator and that those packages are potentially
subject to significant change, rename, and/or deletion as the Orion project further develops.

### [./.circleci](./.circleci)

CircleCI [project](https://circleci.com/gh/nearform/orion) continuous integration configuration.

### [./.storybook](./.storybook)

Storybook [project](https://orion-storybook.nearform.com) configuration

### [./docs](./docs)

**Legacy Directory**

Documentation related to the client-project from which Orion originated. Does contain some useful docs related to technologies used.

### [./packages/e2e-tests](./packages/e2e-tests)

**Legacy Package**

End-to-end tests using TestCafe. Requires environment variables to run, see
[the Quick Start Guide](/docs/quick-start#2-configure). For more details see [the Tests docs](/docs/tests#end-to-end-tests).

### [./packages/functions](./packages/functions)

**Legacy Package**

- lambda serverless functions used to interact with AWS Cognito and Hasura

### [./packages/gatsby-gatsby-theme-acme](./packages/gatsby-gatsby-theme-acme)

Contains all styling (CSS) and unique-client assets (such as logo images) for the Orion demo project `Acme`.

### [./packages/gatsby-plugin-orion-core](./packages/gatsby-plugin-orion-core)

Core components shared by all Orion packages, such as user login and registration.

### [./packages/gatsby-plugin-orion-edit](./packages/gatsby-plugin-orion-edit)

All components and functionality related to the creation and management of page, article, and other content
for Orion projects.

### [./packages/gatsby-plugin-orion-view](./packages/gatsby-plugin-orion-view)

All components and functionality related to the viewing of page, article, and other content for Orion projects.

### [./packages/hasura](./packages/hasura)

**Legacy Package**

The application follows a serverless application model, where the only API used by the frontend is exposed through GraphQL via [Hasura](https://hasura.io).

This folder contains the migrations and scripts necessary to run them.

### [./scripts](./scripts)

A single script designed to overcome a GatsbyJS bug that can sometimes cause CircleCi builds to fail due to out-of-memory errors

### [./terraform](./terraform)

Terraform AWS configuration

[logo-img]: docs/images/Accel_Logo_Orion.svg
[docs]: https://nf-orion.netlify.com/#/

## Dynamicly generate static files

This project is setup to responde to changes to data by rebuilding the static content. This process has 3 moving parts.

Hasura events are setup to listen to changes in all `orion_page` tables. These events call the `content-generator-hook` lambda. The lambda starts a `generate-view-content` workflow on circleCI which ultimately runs `gatsby build` and uploads it to the s3 bucket to be served.
