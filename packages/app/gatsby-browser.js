import React from 'react'
import { GraphQLClient } from 'graphql-hooks'

import * as auth from './utils/auth'
import * as i18n from './utils/i18n'
import { assessments } from './theme.es'
import Layout from './src/components/Layout'
import addTranslations from './utils/translations'
import RootWrapper from './src/components/RootWrapper'
import { useState, useEffect } from 'react'
const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
})

const InitializedWrapper = ({ element }) => {
  const [isInitialised, setIsInitialised] = useState(false)
  useEffect(() => {
    const init = async () => {
      await auth.init(client)
      const i18next = await i18n.init()
      addTranslations(assessments, i18next)
      setIsInitialised(true)
    }
    init()
  }, [])
  return isInitialised ? (
    <RootWrapper client={client}>{element}</RootWrapper>
  ) : null
}
export const wrapRootElement = ({ element }) => {
  return <InitializedWrapper element={element} />
}

export const wrapPageElement = ({ element, props }) => (
  <Layout darkToolbar={props.location.pathname === '/'}>{element}</Layout>
)
