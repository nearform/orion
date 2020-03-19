export default {
  Auth: {
    identityPoolId: process.env.GATSBY_AWS_COGNITO_IDENTITY_POOL_ID,
    region: process.env.GATSBY_AWS_REGION,
    userPoolId: process.env.GATSBY_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.GATSBY_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,

    cookieStorage: {
      // Set to "localhost" for local dev
      domain: process.env.GATSBY_AWS_COOKIE_DOMAIN,
      // Set to "false" for local dev
      secure:
        String(process.env.GATSBY_AWS_COOKIE_SECURE).toLowerCase() === 'true',
    },
  },
  Storage: {
    AWSS3: {
      bucket: process.env.GATSBY_AWS_S3_BUCKET,
      region: process.env.GATSBY_AWS_REGION,
    },
  },
}
