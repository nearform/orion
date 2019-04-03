exports.queryUserByCognitoId = `
query queryUser($cognitoId: ID!) {
  user(
    limit: 1 
    where: { cognito_id: { _eq: $cognitoId } }
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
