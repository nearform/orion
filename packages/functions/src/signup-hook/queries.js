exports.getDefaultRole = `
{
  role(where: {is_default: {_eq: true}}) {
    id
    name
  }
}
`

exports.createUserMutation = `
mutation createUser($cognitoId: ID!, $name: String!, $roleId: Int!) {
    insert_user(objects: {
        cognito_id: $cognitoId
        name: $name
        user_roles: {
            data: [{
                role_id: $roleId
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
