import React from 'react'
import { GraphQLClient } from 'graphql-hooks'

import * as auth from './utils/auth'
import * as i18n from './utils/i18n'
import { assessments } from './theme.es'
import Layout from './src/components/Layout'
import addTranslations from './utils/translations'
import RootWrapper from './src/components/RootWrapper'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
})

export async function onClientEntry() {
  const i18next = await i18n.init()
  addTranslations(assessments, i18next)
}
export async function onInitialClientRender() {
  await auth.init(client)
}

export const wrapRootElement = ({ element }) => (
  <RootWrapper client={client}>{element}</RootWrapper>
)

export const wrapPageElement = ({ element, props }) => (
  <Layout darkToolbar={props.location.pathname === '/'}>{element}</Layout>
)
