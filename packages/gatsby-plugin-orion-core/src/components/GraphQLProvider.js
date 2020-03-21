// eslint-disable-next-line unicorn/filename-case
import React, { useContext, useEffect } from 'react'
import { Auth } from '../utils/amplify'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { debounce, get } from 'lodash'
import { AuthContext } from './AuthWrapper'

const client = makeGraphQLClient(process.env.GATSBY_GRAPHQL_API)

async function refreshAuthorization() {
  const session = await Auth.currentSession()
  const bearer = `Bearer ${session.idToken.jwtToken}`
  client.setHeader('Authorization', bearer)
  return bearer
}

/**
 * Refresh the JWT token after a session timeout.
 */
const refreshToken = debounce(refreshAuthorization, 3000, { leading: true })

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

function GraphQLProvider({ children }) {
  const { authState } = useContext(AuthContext)

  useEffect(() => {
    if (authState === 'signedIn') {
      // Update the authorization token on signin
      refreshAuthorization()
    }
  }, [authState])

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  )
}

export default GraphQLProvider
