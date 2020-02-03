import get from 'lodash/get'
import pino from 'pino'
import graphql from '../graphql'
import getDefaultRole from './graphql/get-default-role.graphql'
import createUser from './graphql/create-user.graphql'
import createUserRole from './graphql/create-user-role.graphql'
const logger = pino()

export const NEW_MEMBER_ROLE_NAME = 'member'

export const handler = async event => {
  try {
    logger.info({ event }, 'creating user')
    if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
      const roleData = await graphql(getDefaultRole)
      const role = get(roleData, 'role.0')

      const user = await graphql(createUser, {
        cognitoId: event.request.userAttributes.sub,
        email: event.request.userAttributes.email,
        firstName: event.request.userAttributes.given_name,
        lastName: event.request.userAttributes.family_name,
        signupRequest: event.request,
        title: 'EFQM Member',
      })
      logger.info({ user }, 'created user')

      const userId = get(user, 'insert_user.returning.0.id')
      await graphql(createUserRole, {
        userId,
        roleId: role.id,
      })
      logger.info(`assigned user ${userId} role ${JSON.stringify(role)}`)
    }

    return event
  } catch (error) {
    logger.error(error)
    throw error
  }
}
