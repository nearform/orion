# Working with Hasura

Hasura is a third-party package that provides common backend features around a PostGres database. It has [documentation](https://docs.hasura.io/1.0/graphql/manual/index.html) that is improving, and a helpful support team who can be contacted via the [Hasura Dischord channel](https://discordapp.com/channels/407792526867693568/428469959530643466).

## Must-knows

 - Using migrations:
   - Hasura tracks structural changes such as adding columns or changing permissions,  using migration files which must be committed to git, and then applied using [`hasura migrate apply`](https://docs.hasura.io/1.0/graphql/manual/hasura-cli/hasura_migrate_apply.html).
   - This command applies all `up` migrations, in the order of the files' timestamps. A corresponding `down` migration is created with every migration, which undoes the change and allows DB changes to be roled back a specified number of steps. For example, `hasura migrate apply --down 5` applies the 5 most recent down migrations, rolling back 5 steps.
   - Some migrations changing the Hasura DB can only be done in SQL, not Hasura commands. For these, the `down` migration will be empty. If rolling back changes using `hasura migrate apply --down` be aware that any such migrations won't be undone.

 - Creating migrations:
   - Hasura has an easy-to use console UI, where graphql queries can be tested on the current DB contents using igraphql, and where direct changes to the database can be made. This allows changes to be exported as migration files. **Structural changes done in the console _must_ be exported and commited (or undone) to prevent the DB getting out of sync with the DB that will be created and deployed**.
   - Migrations can also be written manually using `hasura migrate create SOME_FILENAME`, which creates empty up and down migration files with matching timestamps

 - Permissions:
   - Hasura applies table and row level permissions. These can be viewed in the Permissions tab for any table in the Data section of the Hasura console.
   - The "Roles" are defined in the `functions` package, using a lambda to extract data from a raw-salmon user's JWT
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

In `packages/hasura`'s .env:

```
DATABASE_URL=postgres://postgres:@localhost:5432/postgres
HASURA_GRAPHQL_API=http://localhost:8080/v1/graphql
HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/
```

In packages `assess-base` and `knowledge-base`'s appropriate .env file, e.g. `.env.development`:

```
GATSBY_GRAPHQL_API=http://localhost:8080/v1/graphql
```

In `packages/assess-base-hasura`'s .env:

```
HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/
```

_3_ **Apply the migrations to the local DB**. In packages `hasura` and then `assess-base-hasura` (must be in that order):

```
yarn migrate apply
```

Then launch the Hasura console and check that there is the expected DB structure in Data, but no content.

_4_ **Get a dump file of the current shared Hasura content**, using the Hasura API and the `admin-secret` key from the .env variables shared in clipperz:

```sh
SECRET=<insert here>
curl -H "x-hasura-admin-secret: $SECRET" -d'{"opts": ["--data-only", "-Fc"]}' https://raw-salmon-hasura.nearform.com/v1alpha1/pg_dump > dumpfile

```

_5_ **Import the content into the local DB**.

```
docker-compose exec postgres pg_restore --disable-triggers -U postgres -d postgres /local_dir/dumpfile
```

## Wiping your local Hasura instance

These commands allow you to empty your local Hasura database and start again from scratch. Doing this periodically is important to ensure that a mismatch hasn't developed between the committed Hasura files and the current Hasura state, which could cause a deployment to fail.

_1_ **Dump any local DB changes** (optional). If you want to keep local data, use the local Hasura's pgdump API, similar to above:

```sh
curl -d'{"opts": ["--data-only", "-Fc"]}' http://localhost:8080/v1alpha1/pg_dump > dumpfile
```

_2_ **Nuke the Docker volume and the container that uses it**. WARNING:

 - This command assumes you don't have other, unrelated `hasura` docker containers running on the same machine. If you do, be careful and choose the container IDs manually instead of using the NAMES variable below.
 - This will erase any data you have enterred in your local DB, resetting to a dump file.

```sh
NAMES=$(docker ps -f 'volume=hasura_db_data' -qa);
docker stop $NAMES; docker rm $NAMES; docker volume rm hasura_db_data;
```

_3_ **Restart Docker**.

```sh
cd packages/hasura
docker-compose up
```

_4_ **Re-apply migrations** and if desired, **re-import a dump file** as above.


