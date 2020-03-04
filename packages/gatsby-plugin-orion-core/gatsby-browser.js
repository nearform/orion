import React, { useEffect, useState } from 'react'
import AuthWrapper from './src/components/AuthWrapper'
import { ClientContext } from 'graphql-hooks'
import { initGraphQLClient, makeGraphQLClient } from './src/utils/graphql'

const client = makeGraphQLClient(process.env.GATSBY_GRAPHQL_API)

const AuthInitWrapper = ({ element }) => {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false)

  useEffect(() => {
    const init = async () => {
      await initGraphQLClient(client)
      setIsAuthInitialized(true)
    }

    init()
  }, [])

  return (
    <ClientContext.Provider value={client}>
      <AuthWrapper hasNoParentGroups isAuthInitialized={isAuthInitialized}>
        {element}
      </AuthWrapper>
    </ClientContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => (
  <AuthInitWrapper client={client} element={element} />
)
