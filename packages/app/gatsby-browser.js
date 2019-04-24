import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from '@material-ui/core'

import * as auth from './utils/auth'
import * as i18n from './utils/i18n'
import ThemeWrapper, { theme } from './theme.es'
import Layout from './src/components/layout'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
})

export async function onClientEntry() {
  await auth.init(client)
  await i18n.init()
}

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

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
