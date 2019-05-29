import graphql from '../graphql'
import {
  getUserRoles,
  selectDefaultRoleName,
  DEFAULT_ROLE_NAME,
} from './user-roles'
import { getUserGroup } from './user-groups'
import getUserByCognitoId from './graphql/get-user-by-cognito-id.graphql'
import { getCustomClaims } from './custom-claims'

export const handler = async event => {
  const cognitoId = event.request.userAttributes.sub

  let { user } = await graphql(getUserByCognitoId, {
    cognitoId,
  })

  if (!user.length) {
    // TODO: user not found, will need to handle in some way
    return event
  }

  user = user[0]

  const userGroup = getUserGroup(user)

  if (userGroup) {
    console.log(`user ${cognitoId} belongs to group ${userGroup.id}`)

    const userRoles = getUserRoles(user)

    console.log(`user ${cognitoId} has roles ${userRoles}`)

    const defaultRoleName = selectDefaultRoleName(userRoles, userGroup)

    console.log('selected default role', defaultRoleName)

    event.response = {
      claimsOverrideDetails: {
        claimsToAddOrOverride: {
          'https://hasura.io/jwt/claims': JSON.stringify({
            'x-hasura-allowed-roles': [defaultRoleName],
            'x-hasura-default-role': defaultRoleName,
            'x-hasura-user-id': user.id.toString(),
            'x-hasura-group-id': userGroup.id.toString(),
          }),
          ...getCustomClaims(user),
        },
      },
    }
  } else {
    console.log(`user ${cognitoId} doesn't belong to any groups`)

    event.response = {
      claimsOverrideDetails: {
        claimsToAddOrOverride: {
          'https://hasura.io/jwt/claims': JSON.stringify({
            'x-hasura-allowed-roles': [DEFAULT_ROLE_NAME],
            'x-hasura-default-role': DEFAULT_ROLE_NAME,
            'x-hasura-user-id': user.id.toString(),
          }),
        },
      },
    }
  }

  return event
}
