import Amplify from 'aws-amplify'
import awsConfig from './aws-exports'

const isWindowLoaded = typeof window !== 'undefined'

const AmplifyMock = {
  Auth: {
    user: isWindowLoaded ? localStorage.getItem('loggedIn') : null,

    currentAuthenticatedUser: () => Promise.resolve(),

    signIn({ username, password }) {
      const developmentUsername = process.env.DEVELOPMENT_USERNAME
      const developmentPassword = process.env.DEVELOPMENT_PASSWORD

      if (
        username === developmentUsername &&
        password === developmentPassword
      ) {
        this.user = true
        localStorage.setItem('loggedIn', 'true')
        return Promise.resolve()
      }

      const error = new Error('Invalid credentials')
      error.name = 'Error'
      error.code = ''
      return Promise.reject(error)
    },

    signOut() {
      this.user = null
      localStorage.removeItem('loggedIn')
      return Promise.resolve()
    },
  },
}

const developmentEnv = process.env.NODE_ENV === 'development'
const isCognitoBypassed = process.env.BYPASS_AWS_COGNITO === 'true'
const bypassCognito = developmentEnv && isCognitoBypassed

Amplify.configure(awsConfig)

const { Auth, Storage } = bypassCognito
  ? AmplifyMock
  : { Auth: Amplify.Auth, Storage: Amplify.Storage }

export { Auth, Storage }
