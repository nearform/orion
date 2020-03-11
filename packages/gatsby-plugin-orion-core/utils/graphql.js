import Amplify, { Auth, Hub } from 'aws-amplify'
import { GraphQLClient } from 'graphql-hooks'
import { debounce, get } from 'lodash'

/**
 * Setup JWT authorization for a graphql client.
 *
 * @param client    A graphql client.
 * @param session   The current active amplify session.
 *
 * @return A bearer token header.
 */
function setAuthorization(client, session) {
  const bearer = `Bearer ${session.idToken.jwtToken}`

  client.setHeader('Authorization', bearer)

  return bearer
}

/**
 * Refresh the JWT token after a session timeout.
 */
const refreshToken = debounce(
  async client => {
    const user = await Auth.currentAuthenticatedUser()
    const { refreshToken } = await Auth.currentSession()

    return new Promise((resolve, reject) => {
      user.refreshSession(refreshToken, (err, session) => {
        const bearer = setAuthorization(client, session)

        if (err) {
          reject(err)
        } else {
          resolve(bearer)
        }
      })
    })
  },
  3000,
  { leading: true }
)

/**
 * Make a graphql client.
 *
 * @param url   An endpoint URL.
 */
function makeGraphQLClient(url) {
  const client = new GraphQLClient({
    url,
    fetch: async (resource, init) => {
      const result = await fetch(resource, init)
      const json = await result.clone().json()

      if (get(json, 'errors[0].extensions.code') === 'invalid-jwt') {
        const bearer = await refreshToken(client)

        init.headers.Authorization = bearer

        return fetch(resource, init)
      }

      return result
    },
  })

  return client
}

/**
 * Initialize a graphql client.
 *
 * @param client  A client as returned by makeGraphQLClient.
 */
async function initGraphQLClient(client, awsConfigure) {
  Amplify.configure(awsConfigure)

  Hub.listen('auth', event => {
    if (event.payload.event === 'signin') {
      setAuthorization(client, event.payload.data.signInUserSession)
    }
  })

  try {
    const user = await Auth.currentAuthenticatedUser()

    setAuthorization(client, user.signInUserSession)
  } catch (error) {
    console.log(error)
  }
}

export { makeGraphQLClient, initGraphQLClient }
