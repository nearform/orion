import graphql from '../graphql'
import getUserByCognitoId from './graphql/get-user-by-cognito-id.graphql'
import getGuestRole from './graphql/get-guest-role.graphql'
import { createNumericRolePermissions } from '../../../gatsby-plugin-orion-core/src/utils/permissions'

export const handler = async event => {
  try {
    const cognitoId = event.request.userAttributes.sub
    const { orionUser } = await graphql(getUserByCognitoId, {
      cognitoId,
    })
    const { guestRole } = await graphql(getGuestRole)
    const guestUser = {
      id: 0,
      ...guestRole[0],
      orionGroup: {
        id: 0,
        name: 'none',
      },
    }

    const user = orionUser.length === 1 ? orionUser[0] : guestUser

    event.response = {
      claimsOverrideDetails: {
        claimsToAddOrOverride: {
          'https://hasura.io/jwt/claims': JSON.stringify({
            'x-hasura-user-id': user.id.toString(),
            'x-hasura-role': process.env.HASURA_ROLE,
            'x-hasura-default-role': process.env.HASURA_ROLE,
            'x-hasura-allowed-roles': ['public', 'edit', 'admin'],
            'x-hasura-group-id': user.orionGroup.id.toString(),
          }),
          'x-orion-claims': JSON.stringify({
            'x-orion-user-role-permissions': createNumericRolePermissions(
              user.orionRole.orionRolePermissions
            ),
            'x-orion-user-role': user.orionRole.name,
            'x-orion-user-group': user.orionGroup.name,
          }),
        },
      },
    }

    return event
  } catch (error) {
    throw error
  }
}
