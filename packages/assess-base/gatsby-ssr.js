import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import fetch from 'node-fetch'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { RootWrapper, Layout, ThemeWrapper, theme } from 'components'
import MainToolbar from './src/components/MainToolbar'
import AppFooter from './src/components/AppFooter'
import { AuthInitContext } from './src/utils/auth'

const muiTheme = createMuiTheme(theme.muiTheme)

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

export const wrapRootElement = ({ element }) => (
  <AuthInitContext.Provider value={false}>
    <RootWrapper
      client={client}
      ClientContext={ClientContext}
      muiTheme={muiTheme}
      ThemeProvider={ThemeProvider}
      ThemeWrapper={ThemeWrapper}
      CssBaseline={CssBaseline}
    >
      {element}
    </RootWrapper>
  </AuthInitContext.Provider>
)

export const wrapPageElement = ({ element, props }) => (
  <Layout
    darkToolbar={props.location.pathname === '/'}
    MainToolbar={MainToolbar}
    AppFooter={AppFooter}
  >
    {element}
  </Layout>
)
