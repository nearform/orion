![logo]

# Working with Hasura

Hasura is a third-party package that provides common backend features around a PostGres database. It has [documentation](https://docs.hasura.io/1.0/graphql/manual/index.html) that is improving, and a helpful support team who can be contacted via the [Hasura Dischord channel](https://discordapp.com/channels/407792526867693568/428469959530643466).

## Must-knows

###Using migrations:
- Hasura tracks structural changes such as adding columns or changing permissions,  using migration files which must be committed to git, and then applied using [`hasura migrate apply`](https://docs.hasura.io/1.0/graphql/manual/hasura-cli/hasura_migrate_apply.html).
- This command applies all `up` migrations, in the order of the files' timestamps. A corresponding `down` migration is created with every migration, which undoes the change and allows DB changes to be roled back a specified number of steps. For example, `hasura migrate apply --down 5` applies the 5 most recent down migrations, rolling back 5 steps.
- Some migrations changing the Hasura DB can only be done in SQL, not Hasura commands. For these, the `down` migration will be empty. If rolling back changes using `hasura migrate apply --down` be aware that any such migrations won't be undone.

###Creating migrations:
- Hasura has an easy-to use console UI, where graphql queries can be tested on the current DB contents using igraphql, and where direct changes to the database can be made. This allows changes to be exported as migration files. **Structural changes done in the console _must_ be exported and commited (or undone) to prevent the DB getting out of sync with the DB that will be created and deployed**.
- Migrations can also be written manually using `hasura migrate create SOME_FILENAME`, which creates empty up and down migration files with matching timestamps

###Permissions:
- Hasura applies table and row level permissions. These can be viewed in the Permissions tab for any table in the Data section of the Hasura console.
- The "Roles" are defined in the `functions` package, using a lambda to extract data from an Orion user's JWT
- Hasura migrations that change permissions typically involve removing all previous permissions on a table, and adding a new set including or missing the permission(s) that were added or removed. Be aware that this can therefore have unintended side effects if any changes have been made from any source other than the current hasura migrations directory.


## Setting up a local Hasura instance

The .env variables provided in clipperz point to a shared Hasura instance. It can be helpful to test Hasura migrations on a local instance to ensure unintended consequences don't impact on colleagues and to ensure that migrations apply correctly on a clean Hasura instance.

**Warning:** When colleagues use local Hasura instances, this may cause problems when multiple PRs are worked on at the same time that contain migrations affecting the same schemas. If you use a local Hasura instance, be careful to apply migrations from colleagues' work locally and, where necessary, re-create your own migrations before merging, or recreate them from the staging Hasura instance, to ensure migrations don't clash or undo each other.

_1_ **Start a local PostGres database using Docker**.

```sh
cd packages/hasura
docker-compose up
```

_2_ **Point local .env variables at it**. For convenient switching, comment out the existing env variables, then you can switch from local to shared by adding and deleting the `\#` from each line and restarting Gatsby and the Hasura console.

| VAR | Description |
| :--- | :---- |
| `DATABASE_URL` | ADD DESCRIPTION |
| `HASURA_GRAPHQL_API` | ADD DESCRIPTION |
| `HASURA_GRAPHQL_ENDPOINT` | ADD DESCRIPTION |
| `GATSBY_GRAPHQL_API` | ADD DESCRIPTION |

In `packages/hasura`'s .env:

```
DATABASE_URL=postgres://postgres:@localhost:5432/postgres
HASURA_GRAPHQL_API=http://localhost:8080/v1/graphql
HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/
```

In package `knowledge-base`'s appropriate .env file, e.g. `.env.development`:

```
GATSBY_GRAPHQL_API=http://localhost:8080/v1/graphql
```

In `packages/knowledge-base-hasura`'s .env:

```
HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/
```

_3_ **Apply the migrations to the local DB**. In packages `hasura` and then `knowledge-base-hasura` (must be in that order):

```
yarn migrate apply
```

Then launch the Hasura console and check that there is the expected DB structure in Data, but no content.

_4_ **Get a dump file of the current shared Hasura content**, using the Hasura API and the `admin-secret` key from the .env variables shared in clipperz:

```sh
SECRET=<insert here>
curl -H "x-hasura-admin-secret: $SECRET" -d'{"opts": ["--data-only", "-Fc"]}' https://orion-hasura.nearform.com/v1alpha1/pg_dump > dumpfile

```

_5_ **Import the content into the local DB**.

```
docker-compose exec postgres pg_restore --disable-triggers -U postgres -d postgres /local_dir/dumpfile
```

### Stopping the local DB

There are 2 ways to stop the local DB:

1. `docker-compose stop` stops the docker containers but leaves the docker volume containing the postgres data intact. If the local instance is restarted with `docker-compose up` the DB will have the same state. Refer to the docker documentation for managing volumes.
2. `docker-compose down --volumes` stops the containers, destroys the containers, and deletes the volume containing the postgres database. Subsequent `up` commands will create a new DB. This is useful for cloning a fresh copy of the remote DB.

## Manually squashing migrations

Tracking each change in the DB can lead to a lot of pollution in the migrations. Also consider that [enums require special attention](https://github.com/hasura/graphql-engine/issues/2817) require special consideration. It may be necessary to manually "squash" the migrations into minimum set of the migrations. This section documents that procedure.

Hasura migration commands can be accessed from the terminal:

   ```bash
   yarn migrate [...args]
   ```

   See `yarn migrate --help` and the Hasura docs for help

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
   
## Wiping your local Hasura instance

These commands allow you to empty your local Hasura database and start again from scratch. Doing this periodically is important to ensure that a mismatch hasn't developed between the committed Hasura files and the current Hasura state, which could cause a deployment to fail.

1. **Dump any local DB changes** (optional). If you want to keep local data, use the local Hasura's pgdump API, similar to above:
   ```sh
   curl -d'{"opts": ["--data-only", "-Fc"]}' http://localhost:8080/v1alpha1/pg_dump > dumpfile
   ```
1. **Nuke the Docker volume and the container that uses it**. WARNING:
    - This command assumes you don't have other, unrelated `hasura` docker containers running on the same machine. If you do, be careful and choose the container IDs manually instead of using the NAMES variable below.
    - This will erase any data you have enterred in your local DB, resetting to a dump file.
   ```sh
   NAMES=$(docker ps -f 'volume=hasura_db_data' -qa);
   docker stop $NAMES; docker rm $NAMES; docker volume rm hasura_db_data;
   ``
1. **Restart Docker**.
   ```sh
   cd packages/hasura
   docker-compose up
   ```
1. **Re-apply migrations** and if desired, **re-import a dump file** as above.

---

References:

- https://ruleoftech.com/2020/reset-hasura-migrations-and-squash-files
- https://hasura.io/docs/1.0/graphql/manual/migrations/existing-database.html#migrations-existing-db
- https://github.com/hasura/graphql-engine/issues/2817

<!-- External links -->


<!-- Images mages -->
[logo]: ../images/logo_hasura.svg#logo
