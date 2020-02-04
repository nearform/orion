import React, { useState, useEffect } from 'react'
import { ClientContext } from 'graphql-hooks'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import './styles/global.css' // eslint-disable-line import/no-unassigned-import

import {
  // AddTranslations,
  AuthWrapper,
  RootWrapper,
  Layout,
  ThemeWrapper,
  makeGraphQLClient,
  initGraphQLClient,
  theme,
} from 'components'
import AppFooter from '../gatsby-plugin-orion-view/src/components/AppFooter'
import MainToolbar from '../gatsby-plugin-orion-view/src/components/MainToolbar'
import awsConfig from './utils/aws-exports'
import useUserGroups from './hooks/useUserGroups'

const muiTheme = createMuiTheme(theme.muiTheme)

const client = makeGraphQLClient(process.env.GATSBY_GRAPHQL_API)

export async function onClientEntry() {
  /*
  Const i18next = await i18n.init()
  addTranslations('assessments', i18next)
  */
}

const AuthInitializationWrapper = ({ element }) => {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false)
  useEffect(() => {
    const init = async () => {
      await initGraphQLClient(client, awsConfig)
      setIsAuthInitialized(true)
    }

    init()
  }, [])

  return (
    <RootWrapper
      client={client}
      ClientContext={ClientContext}
      muiTheme={muiTheme}
      ThemeProvider={ThemeProvider}
      ThemeWrapper={ThemeWrapper}
      CssBaseline={CssBaseline}
    >
      <AuthWrapper allowNoParentGroups isAuthInitialized={isAuthInitialized}>
        {element}
      </AuthWrapper>
    </RootWrapper>
  )
}

export const wrapRootElement = ({ element }) => {
  return <AuthInitializationWrapper element={element} />
}

const PageWrapper = ({ darkToolbar, children }) => {
  useUserGroups()
  return (
    <Layout
      darkToolbar={darkToolbar}
      AppFooter={AppFooter}
      MainToolbar={MainToolbar}
    >
      {children}
    </Layout>
  )
}

export const wrapPageElement = ({ element, props }) => (
  <PageWrapper darkToolbar={props.location.pathname === '/'}>
    {element}
  </PageWrapper>
)
