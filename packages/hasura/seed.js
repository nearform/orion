const { GraphQLClient } = require('graphql-request')
const seedData = require('./seed-data')

const upsertRolesQuery = `
mutation upsert_seed_data ($roles: [role_insert_input!]!) {
  insert_role (
    objects: $roles,
    on_conflict: { constraint: role_name_key, update_columns: [order, is_default] }
  ) {
    returning {
      id
      name
      order
      is_default
    }
  }
}`

const client = new GraphQLClient(process.env.HASURA_GRAPHQL_API, {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
})

async function main() {
  try {
    console.log('upserting roles...')
    const res = await client.request(upsertRolesQuery, {
      roles: seedData.roles,
    })
    console.log('upserted', res.insert_role.returning)
  } catch (error) {
    console.error('there has been a problem upserting data', error)
  }
}

main()
