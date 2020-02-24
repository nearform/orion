import React from 'react'
import AuthWrapper from './src/components/AuthWrapper'
import fetch from 'node-fetch'
import { ClientContext } from 'graphql-hooks'
import { GraphQLClient } from 'graphql-hooks'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

const AuthInitWrapper = ({ element }) => {
  return (
    <ClientContext.Provider value={client}>
      <AuthWrapper>{element}</AuthWrapper>
    </ClientContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => (
  <AuthInitWrapper element={element} />
)
