import React from 'react'

// custom typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { GraphQLClient, ClientContext } from 'graphql-hooks'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  headers: {
    'x-hasura-admin-secret': process.env.GATSBY_GRAPHQL_ADMIN_SECRET,
  },
})

export const wrapRootElement = ({ element }) => {
  return (
    <ClientContext.Provider value={client}>{element}</ClientContext.Provider>
  )
}
