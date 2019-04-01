const graphql = require('../graphql')
const { getDefaultRole, createCreateUserMutation } = require('./queries')

exports.handler = async event => {
  const {
    body: {
      data: { role },
    },
  } = await graphql(getDefaultRole)

  if (!role.length) {
    throw new Error('no default role found')
  }

  const createUser = createCreateUserMutation(event, role)

  await graphql(createUser)

  return event
}
