const graphql = require('../graphql')
const { getDefaultRole, createUserMutation } = require('./queries')

exports.handler = async event => {
  const { role } = await graphql(getDefaultRole)

  console.log('found role', role)

  if (!role.length) {
    throw new Error('no default role found')
  }

  console.log('creating user', event, role)

  const user = await graphql(createUserMutation, {
    cognitoId: event.request.userAttributes.sub,
    name: event.userName,
    roleId: role[0].id,
  })

  console.log('created user', user)

  return event
}
