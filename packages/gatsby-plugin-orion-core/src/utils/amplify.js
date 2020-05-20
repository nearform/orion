import Amplify from 'aws-amplify'
import awsConfig from './aws-exports'

const AmplifyMock = {
  Auth: {
    user: null,
    currentAuthenticatedUser: () => Promise.resolve(),
    signIn({ username, password }) {
      if (username === 'test@test.com' && password === 'test') {
        this.user = true
        return Promise.resolve()
      }

      const error = new Error('whoos')
      error.name = 'name'
      error.code = 500
      return Promise.reject(error)
    },
    signOut() {
      this.user = null
      return Promise.resolve()
    },
  },
}

Amplify.configure(awsConfig)

const developmentEnv = process.env.NODE_ENV === 'development'

const { Auth, Storage } = developmentEnv
  ? AmplifyMock
  : { Auth: Amplify.Auth, Storage: Amplify.Storage }

export { Auth, Storage }
