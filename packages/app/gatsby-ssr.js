import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import fetch from 'node-fetch'

import 'nearform-theme'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

export const wrapRootElement = ({ element }) => {
  return (
    <ClientContext.Provider value={client}>{element}</ClientContext.Provider>
  )
}
