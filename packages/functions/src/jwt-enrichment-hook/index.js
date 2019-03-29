const graphql = require('../graphql')
const createUserQuery = require('./createUserQuery')

exports.handler = async event => {
  const queryUser = createUserQuery(event)

  const {
    body: {
      data: { user },
    },
  } = await graphql(queryUser)

  if (user.length) {
    event.response = {
      claimsOverrideDetails: {
        claimsToAddOrOverride: {
          'https://hasura.io/jwt/claims': JSON.stringify({
            'x-hasura-allowed-roles': [user[0].user_roles[0].role.name],
            'x-hasura-default-role': user[0].user_roles[0].role.name,
            'x-hasura-user-id': user[0].id,
          }),
        },
      },
    }
  }

  return event
}
