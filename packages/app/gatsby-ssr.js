import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { KnowledgebaseTheme } from 'components'
import fetch from 'node-fetch'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

export const wrapRootElement = ({ element }) => {
  return (
    <ClientContext.Provider value={client}>
      <KnowledgebaseTheme>{element}</KnowledgebaseTheme>
    </ClientContext.Provider>
  )
}
