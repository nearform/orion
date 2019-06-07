import React from 'react'
import { GraphQLClient } from 'graphql-hooks'
import fetch from 'node-fetch'
import Layout from './src/components/Layout'
import RootWrapper from './src/components/RootWrapper'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

export const wrapRootElement = ({ element }) => (
  <RootWrapper client={client}>{element}</RootWrapper>
)

export const wrapPageElement = ({ element, props }) => (
  <Layout darkToolbar={props.location.pathname === '/'}>{element}</Layout>
)
