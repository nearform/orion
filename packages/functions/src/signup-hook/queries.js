exports.getDefaultRole = `
{
  role(where: {is_default: {_eq: true}}) {
    id
    name
  }
}
`

exports.createCreateUserMutation = (event, role) => `
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
