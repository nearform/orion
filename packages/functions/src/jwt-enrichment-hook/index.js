import graphql from '../graphql'
import { getAllowedRoles, selectDefaultRole } from './user-roles'
import getUserByCognitoId from './graphql/get-user-by-cognito-id.graphql'

export const handler = async event => {
  const { user } = await graphql(getUserByCognitoId, {
    cognitoId: event.request.userAttributes.sub,
  })

  if (!user.length) {
    // TODO: user not found, will need to handle in some way
    return event
  }

  const allowedRoles = getAllowedRoles(user[0])

  console.log('user has allowed roles', allowedRoles)

  const defaultRole = selectDefaultRole(allowedRoles)

  console.log('selected default role', defaultRole)

  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        'https://hasura.io/jwt/claims': JSON.stringify({
          'x-hasura-allowed-roles': allowedRoles.map(r => r.name),
          'x-hasura-default-role': defaultRole.name,
          'x-hasura-user-id': user[0].id.toString(),
        }),
      },
    },
  }

  return event
}
