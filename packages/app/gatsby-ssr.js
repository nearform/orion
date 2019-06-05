import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import fetch from 'node-fetch'
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from '@material-ui/core'

import ThemeWrapper, { theme } from './theme.es'

import Layout from './src/components/Layout'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

export const wrapRootElement = ({ element }) => (
  <ClientContext.Provider value={client}>
    <MuiThemeProvider theme={createMuiTheme(theme.muiTheme)}>
      <ThemeWrapper>
        <CssBaseline />
        {element}
      </ThemeWrapper>
    </MuiThemeProvider>
  </ClientContext.Provider>
)

export const wrapPageElement = ({ element, props }) => (
  <Layout darkToolbar={props.location.pathname === '/'}>{element}</Layout>
)
