import graphql from '../graphql'
import getUserByCognitoId from './graphql/get-user-by-cognito-id.graphql'
import getGuestRole from './graphql/get-guest-role.graphql'
import { createNumericRolePermissions } from '../../../gatsby-plugin-orion-core/src/utils/permissions'

export const handler = async event => {
  try {
    const cognitoId = event.request.userAttributes.sub
    const { orionUserData } = await graphql(getUserByCognitoId, {
      cognitoId,
    })
    const { guestRole } = await graphql(getGuestRole)
    const guestUser = {
      id: 0,
      ...guestRole.orionRole[0],
      orionGroup: {
        id: 0,
        name: 'none',
      },
    }

    const user =
      orionUserData.orionUser.length === 1
        ? orionUserData.orionUser[0]
        : guestUser

    /*
     * NOTE: X-Hasura-Role and X-Hasura-Default-Role manually set to admin. Change later.
     */
    event.response = {
      claimsOverrideDetails: {
        claimsToAddOrOverride: {
          'https://hasura.io/jwt/claims': JSON.stringify({
            'X-Hasura-User-Id': user.id.toString(),
            'X-Hasura-Role-Id': user.orionRole.id.toString(),
            'X-Hasura-Role': 'admin',
            'X-Hasura-Default-Role': 'admin',
            'X-Hasura-Allowed-Roles': ['public', 'edit', 'admin'],
            'X-Hasura-Group-Id': user.orionGroup.id.toString(),
          }),
          'X-Orion-Claims': JSON.stringify({
            'X-Orion-User-Role-Permissions': createNumericRolePermissions(
              user.orionRole.orionRolePermissions
            ),
            'X-Orion-User-Role': user.orionRole.name,
            'X-Orion-User-Group': user.orionGroup.name,
          }),
        },
      },
    }

    return event
  } catch (error) {
    throw error
  }
}
