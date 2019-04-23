import Amplify, { Auth, Hub } from 'aws-amplify'

import awsConfig from './aws-exports'

export async function init(graphqlClient) {
  const setClientToken = session => {
    graphqlClient.setHeader(
      'Authorization',
      `Bearer ${session.idToken.jwtToken}`
    )
  }

  const authListener = event => {
    if (event.payload.event === 'signIn') {
      setClientToken(event.payload.data.signInUserSession)
    }
  }

  Amplify.configure(awsConfig)
  Hub.listen('auth', authListener)

  try {
    const currentSession = await Auth.currentSession()

    setClientToken(currentSession)
  } catch (err) {
    // no authenticated user, it's fine
  }
}
