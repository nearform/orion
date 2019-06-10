import React from 'react'
import { GraphQLClient } from 'graphql-hooks'
import fetch from 'node-fetch'
import Layout from './src/components/Layout'
import RootWrapper from './src/components/RootWrapper'
import { AuthInitContext } from './src/utils/auth'
const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

export const wrapRootElement = ({ element }) => (
  <AuthInitContext.Provider value={false}>
    <RootWrapper client={client}>{element}</RootWrapper>
  </AuthInitContext.Provider>
)

export const wrapPageElement = ({ element, props }) => (
  <Layout darkToolbar={props.location.pathname === '/'}>{element}</Layout>
)
