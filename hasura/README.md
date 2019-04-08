# hasura

This directory contains the Hasura configuration and migration files.

Its main purpose is to contain Hasura configuration and to run the Hasura console.

Please read the [Hasura documentation](https://docs.hasura.io) to learn more.

## Setup and running

- make sure that the Hasura CLI is installed as described in the [docs](https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html)
- `cp .env.sample .env`
- populate the `.env` file with the required environment variables. Note that for the sake of running the Hasura console, `HASURA_GRAPHQL_ADMIN_SECRET` is the only environment variable required, as the others are needed to run Hasura itself
- `npm run console`

This will open the local Hasura Web console, pointing at the Hasura instance specified in the `config.yaml` file.

## Handling the database schema and Hasura metadata

Make sure you check out the Hasura docs to understand how this works.

Changes made to the database via the Hasura console are replicated in corresponding migration files stored in the [migrations](./migrations) directory. This allows to reproduce the DB schema and Hasura metadata in other environments, hence they should be committed to the repository.
