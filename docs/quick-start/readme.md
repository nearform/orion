# Quick Start

![getting-started](../images/getting-started.svg)

## Project Setup

### 1. Clone and install dependencies

```
git clone https://github.com/nearform/raw-salmon.git

cd raw-salmon

npm i
```

### 2. Configure

Most of the configuration comes from environment variables. Required environment variables for each part of the architecture are documented in the `.env.sample` files inside the repository.

- app [`.env.sample`](../../packages/app/.env.sample) - build time environment variables for the Gatsby application. They should also be configured in CI, along with any other environment variables required by CI
- hasura [`.env.sample`](../../hasura/.env.sample) - runtime environment variables for Hasura and Hasura console. They need to be configured when running Hasura or Hasura console.
- functions [`.env.sample`](../../packages/functions/.env.sample) - runtime environment variables for AWS Lambda functions.

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
