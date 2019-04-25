import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import fetch from 'node-fetch'

import './theme.js'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

export const wrapRootElement = ({ element }) => (
  <ClientContext.Provider value={client}>{element}</ClientContext.Provider>
)
