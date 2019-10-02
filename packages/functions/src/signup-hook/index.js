import get from 'lodash/get'
import graphql from '../graphql'
import getRoleByName from './graphql/get-role-by-name.graphql'
import createUser from './graphql/create-user.graphql'
import createUserRole from './graphql/create-user-role.graphql'

export const NEW_MEMBER_ROLE_NAME = 'member'

export const handler = async event => {
  console.log('creating user', event)
  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    const roleData = await graphql(getRoleByName, {
      name: NEW_MEMBER_ROLE_NAME,
    })
    const role = get(roleData, 'role.0')

    const user = await graphql(createUser, {
      cognitoId: event.request.userAttributes.sub,
      email: event.request.userAttributes.email,
      firstName: event.request.userAttributes.given_name,
      lastName: event.request.userAttributes.family_name,
      signupRequest: event.request,
      title: 'EFQM Member',
    })
    console.log('created user', JSON.stringify(user))

    const userId = get(user, 'insert_user.returning.0.id')
    await graphql(createUserRole, {
      userId: userId,
      roleId: role.id,
    })
    console.log(`assigned user ${userId} role ${JSON.stringify(role)}`)
  }

  return event
}
