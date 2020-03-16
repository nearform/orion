import React, { useEffect, useState } from 'react'
import awsConfig from './utils/aws-exports'
import AuthWrapper from './src/components/AuthWrapper'
import { ClientContext } from 'graphql-hooks'
import { initGraphQLClient, makeGraphQLClient } from './utils/graphql'
import { loadCSS } from 'fg-loadcss'

const client = makeGraphQLClient(process.env.GATSBY_GRAPHQL_API)

const AuthInitWrapper = ({ element }) => {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false)

  useEffect(() => {
    const init = async () => {
      await initGraphQLClient(client, awsConfig)
      setIsAuthInitialized(true)
    }

    init()
  }, [])

  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.1/css/all.css',
      document.querySelector('#font-awesome-css')
    )
  }, [])

  return (
    <ClientContext.Provider value={client}>
      <AuthWrapper isAuthInitialized={isAuthInitialized}>{element}</AuthWrapper>
    </ClientContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => (
  <AuthInitWrapper client={client} element={element} />
)
