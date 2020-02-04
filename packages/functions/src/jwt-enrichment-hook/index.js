import pino from 'pino'
import graphql from '../graphql'
import {
  getUserRoles,
  selectDefaultRoleName,
  PUBLIC_ROLE_NAME,
} from './user-roles'
import { getUserGroup } from './user-groups'
import getUserByCognitoId from './graphql/get-user-by-cognito-id.graphql'
const logger = pino()

export const handler = async event => {
  try {
    const cognitoId = event.request.userAttributes.sub

    let { user } = await graphql(getUserByCognitoId, {
      cognitoId,
    })

    if (user.length === 0) {
      // TODO: user not found, will need to handle in some way
      return event
    }

    user = user[0]

    const userGroup = getUserGroup(user)

    if (userGroup) {
      const userRoles = getUserRoles(user)
      const defaultRoleName = selectDefaultRoleName(userRoles, userGroup)

      event.response = {
        claimsOverrideDetails: {
          claimsToAddOrOverride: {
            'https://hasura.io/jwt/claims': JSON.stringify({
              'x-hasura-allowed-roles': [defaultRoleName],
              'x-hasura-default-role': defaultRoleName,
              'x-hasura-user-id': user.id.toString(),
              'x-hasura-group-id': userGroup.id.toString(),
            }),
          },
        },
      }
    } else {
      logger.info(`user ${cognitoId} doesn't belong to any groups`)

      event.response = {
        claimsOverrideDetails: {
          claimsToAddOrOverride: {
            'https://hasura.io/jwt/claims': JSON.stringify({
              'x-hasura-allowed-roles': [PUBLIC_ROLE_NAME],
              'x-hasura-default-role': PUBLIC_ROLE_NAME,
              'x-hasura-user-id': user.id.toString(),
            }),
          },
        },
      }
    }

    return event
  } catch (error) {
    logger.error(error)
    throw error
  }
}
