import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import fetch from 'node-fetch'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import './src/styles/global.css' // eslint-disable-line import/no-unassigned-import

import {
  AuthWrapper,
  RootWrapper,
  Layout,
  ThemeWrapper,
  theme,
} from 'components'
import AppFooter from './src/components/AppFooter'
import MainToolbar from './src/components/MainToolbar'
import useUserGroups from './src/hooks/useUserGroups'

const muiTheme = createMuiTheme(theme.muiTheme)

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

const AuthInitializationWrapper = ({ element }) => {
  return (
    <RootWrapper
      client={client}
      ClientContext={ClientContext}
      muiTheme={muiTheme}
      ThemeProvider={ThemeProvider}
      ThemeWrapper={ThemeWrapper}
      CssBaseline={CssBaseline}
    >
      <AuthWrapper>{element}</AuthWrapper>
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
