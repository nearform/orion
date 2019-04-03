const { GraphQLClient } = require('graphql-request')

const client = new GraphQLClient(process.env.GRAPHQL_API, {
  headers: {
    'x-hasura-admin-secret': process.env.GRAPHQL_ADMIN_SECRET,
  },
})

module.exports = function(query, variables) {
  return client.request(query, variables)
}
