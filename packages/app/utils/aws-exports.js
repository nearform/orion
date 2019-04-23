export default {
  Auth: {
    identityPoolId: process.env.GATSBY_AWS_COGNITO_IDENTITY_POOL_ID,
    region: process.env.GATSBY_AWS_REGION,
    userPoolId: process.env.GATSBY_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.GATSBY_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
}
