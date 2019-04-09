# NearForm 🤓 Knowledgebase 

[![CircleCI](https://circleci.com/gh/nearform/knowledgebase.svg?style=svg&circle-token=0ce58bd80ab2db1fd16b1eca28dba58c62588a74)](https://circleci.com/gh/nearform/knowledgebase)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


This repo is a collection of packages that can be used as a foundation for a statically built, GraphQL-driven knowledgebase.

The packages are contained in a [lerna](https://github.com/lerna/lerna) monorepo.

## Repository layout

### components

- a component library based on [styled-components](https://www.styled-components.com/)
- a design system with a `ThemeProvider` approach to theming and using
      [saluki](https://github.com/nearform/saluki) for its CSS-in-JS modular
      approach with sane defaults similar in concept to [tailwind](https://tailwindcss.com/docs/what-is-tailwind/)

### app

- a static build enabled app based on [gatsby](https://www.gatsbyjs.org)
- Gatsby uses [graphql](https://graphql.org/) to fetch data from the API

### functions

- lambda serverless functions used to interact with AWS Cognito and Hasura

## Setup

```
git clone git@github.com:nearform/knowledgebase.git

cd knowledgebase

npm i
```

## Storybook

```
cd packages/components
npm run storybook
```

## Running

```
cd packages/app
npm start
```

## Adding new dependencies

```
npx lerna add <npm-package-name> --scope=<package/module>
npx lerna add -D <npm-package-name> --scope=<package/module> // for dev dependencies
```
