exports.createUserQuery = event => `
{
  user(
    limit: 1 
    where: {cognito_id: { _eq: "${event.request.userAttributes.sub}"}}
  ) {
    id
    name
    user_roles {
      role {
        name
      }
    }
  }
}
`
