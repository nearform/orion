import graphql from '../graphql'
import getUserByCognitoId from './graphql/get-user-by-cognito-id.graphql'

export const handler = async event => {
  const { user } = await graphql(getUserByCognitoId, {
    cognitoId: event.request.userAttributes.sub,
  })

  if (user.length) {
    event.response = {
      claimsOverrideDetails: {
        claimsToAddOrOverride: {
          'https://hasura.io/jwt/claims': JSON.stringify({
            'x-hasura-allowed-roles': [user[0].user_roles[0].role.name],
            'x-hasura-default-role': user[0].user_roles[0].role.name,
            'x-hasura-user-id': user[0].id.toString(),
          }),
        },
      },
    }
  }

  return event
}
