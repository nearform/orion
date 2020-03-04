import graphql from '../graphql'
import getRoleByName from './graphql/get-role-by-name.graphql'
import createUser from './graphql/create-user.graphql'

export const handler = async event => {
  try {
    if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
      const roleData = await graphql(getRoleByName, { roleName: 'Member' })
      const role = roleData.length > 0 ? roleData[0] : { id: 0 }

      await graphql(createUser, {
        cognitoId: event.request.userAttributes.sub,
        givenName: event.request.userAttributes.given_name,
        email: event.request.userAttributes.email,
        roleId: role.id,
        groupId: 1,
      })
    }

    return event
  } catch (error) {
    throw error
  }
}
