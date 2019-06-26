export default {
  Auth: {
    identityPoolId: process.env.GATSBY_AWS_COGNITO_IDENTITY_POOL_ID,
    region: process.env.GATSBY_AWS_REGION,
    userPoolId: process.env.GATSBY_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.GATSBY_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
    cookieStorage: {
      domain: window.location.hostname,
      path: '/',
      // OPTIONAL - Cookie expiration in days
      expires: Number(process.env.GATSBY_AWS_COGNITO_COOKIE_EXPIRATION) || 1,
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: !!process.env.GATSBY_AWS_COGNITO_COOKIE_SECURE,
    },
  },
  Storage: {
    AWSS3: {
      bucket: process.env.GATSBY_AWS_S3_BUCKET,
      region: process.env.GATSBY_AWS_REGION,
    },
  },
}
