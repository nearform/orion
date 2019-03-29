const graphql = require('../graphql')

exports.handler = async event => {
  const queryRoles = `{ 
        role {
            id
            name
        }
    }`

  const {
    body: {
      data: { role },
    },
  } = await graphql(queryRoles)

  const createUser = `
    mutation createUser {
        insert_user(objects: {
            cognito_id: "${event.request.userAttributes.sub}"
            name: "${event.userName}"
            roles: {
                data: [{
                    role_id: ${role[0].id}
                }]
            }
        }) {
            returning {
                id
                cognito_id
            }
        }
    }
`

  await graphql(createUser)

  return event
}
