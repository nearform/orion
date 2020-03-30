# Hasura

Administer Hasura deployed in AWS or run a local instance of the Hasura engine and postgres with docker-compose.

## Administer remote Hasura

To administer (access the Hasura console and run migrations) the instance deployed to AWS, follow these directions:

### Prerequisites

1. Use yarn to install the package:

   ```bash
   yarn
   ```

1. Ensure the `.env` file sets the following vars:
   |VAR|Description|Example|
   |--|--|--|
   |`HASURA_ADMIN_SECRET`|Hasura admin secret of the **remote** DB | `123abc` |
   |`HASURA_GRAPHQL_ENDPOINT`|URL of the remote Hasura instance| `https://remote-hasrua-instance.com` |

### Run the Hasura console locally

1. Run the console from the terminal:
   ```bash
   yarn console
   ```
1. Navigate to console at http://localhost:9695

### Run Migrations

Refer to the [Hasura docs](https://hasura.io/docs/1.0/graphql/manual/migrations/index.html) for learning about migrations.

1. Hasura migration commands can be accessed from the terminal:

   ```bash
   yarn migrate [...args]
   ```

   See `yarn migrate --help` and the Hasura docs for help

🚨 As discussed in this [github issue](https://github.com/hasura/graphql-engine/issues/2817), Hasura enums and migrations are not compatible because Hasura requires an enum table to have rows in it before it can be set as an enum table. Care should be taken when exporting migrations from the orion DB. Upon exporting, manually add a line inserting the enum values in the generated SQL file. Then the SQL file and the metadata file _must be applied as 2 separate migrations._ Otherwise there will be errors applying the migrations into another DB.

💡 Refer to [Manually squashing migrations](#manually-squashing-migrations) for the steps to squash all migrations.

## Run local DB instance (Hasura + Postgres)

There is a [video tutorial](https://drive.google.com/open?id=1KWPzau_-WuUnvXSu1AMvbrUoFueVg9Nx) demonstrating how to run the DB locally. The following instructions describe the procedure:

### Prerequisites

**⚠️ You must have [docker-compose](https://docs.docker.com/compose/) installed on your development machine.**

### Start the local DB

1. **Optional:** you can customize the Postgres password and the Hasura admin secret inside `docker-compose.yml`.

   **⚠️ There is no requirement to set the above parameters, however be aware your local DB will not be secured.**

1. Bring up the docker-compose environment from the terminal:

   ```bash
   docker-compose up
   ```

   ℹ️ Tip: depending on your operating system you may need may need sudo privileges to run docker-compose.

1. Access the hasura console at http://localhost:8080

1. Configure the environment variables for the other packages to access your new graphql endpoint at http://localhost:8080/v1/graphql and remove the Hasura admin secret if you didn't configure one.

### Clone the remote DB into your local DB

Upon completing the steps to start the DB locally, you can clone the current schema, data, and hasura metadata of the DB deployed in AWS by following these directions:

1. Ensure the `.env` file sets the following vars:
   |VAR|Description|Example|
   |--|--|--|
   |`HASURA_ADMIN_SECRET`|Hasura admin secret of the **remote** DB | `123abc` |
   |`HASURA_REMOTE_BASE_URL`|Base URL (including a trailing slash) of the remote Hasura instance| `https://remote-hasrua-instance.com/` |
   |`HASURA_LOCAL_BASE_URL`|Base URL (including a trailing slash) of the local Hasura instance| `http://localhost:8080/`|

1. From the terminal, run:
   ```bash
   yarn clone
   ```

### Stopping the local DB

There are 2 ways to stop the local DB:

1. `docker-compose stop` stops the docker containers but leaves the docker volume containing the postgres data intact. If the local instance is restarted with `docker-compose up` the DB will have the same state. Refer to the docker documentation for managing volumes.
2. `docker-compose down --volumes` stops the containers, destroys the containers, and deletes the volume containing the postgres database. Subsequent `up` commands will create a new DB. This is useful for cloning a fresh copy of the remote DB.

## Manually squashing migrations

Tracking each change in the DB can lead to a lot of pollution in the migrations. Also consider that [enums require special attention](https://github.com/hasura/graphql-engine/issues/2817) require special consideration. It may be necessary to manually "squash" the migrations into minimum set of the migrations. This section documents that procedure.

1. Delete the sub-directories in `./migrations` of the migrations that will be replaced (probably all of them).
1. Export the SQL schema and Hasura metadata in 2 separate migrations:
   ```bash
   yarn migrate create init_sql --sql-from-server
   yarn migrate create init_metadata --metadata-from-server
   ```
1. Manually add a migration **in between** the above 2 migrations to insert enum values:
   1. create a directory `./migrations/{timestamp}_insert_enums` where `{timestamp}` is a value between the migrations created in the previous step.
   1. add a file to the above directory named `up.sql` and manually insert the enum values. For example:
      ```sql
      INSERT INTO public.orion_permissions(permission_set)
      VALUES ('pages'), ('articles'), ('users') ON CONFLICT DO NOTHING;
      ```
1. Brute-force delete the record of all migrations in the remote DB by running the following SQL command in the Hasura console. This clears Hasura's history of all applied migrations.
   ```sql
   TRUNCATE hdb_catalog.schema_migrations;
   ```
1. Verify the Database Status reports Not Present for all migrations:
   ```bash
   yarn migrate status
   ```
1. Apply each migration file that was created in the above steps to the DB. They should be applied with the `--skip-execution` flag so that the are just marked as applied without executing since the DB is already configured. For each migration run:
   ```bash
   yarn migrate apply --version {MIGRATION_VERSION} --skip-execution
   ```
   👆 run this command for the 3 migrations make in the previous steps
1. Verify the migrations are now Present:
   ```bash
   yarn migrate status
   ```

References:

- https://ruleoftech.com/2020/reset-hasura-migrations-and-squash-files
- https://hasura.io/docs/1.0/graphql/manual/migrations/existing-database.html#migrations-existing-db
- https://github.com/hasura/graphql-engine/issues/2817
