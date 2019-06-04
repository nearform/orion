import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from '@material-ui/core'

import * as auth from './utils/auth'
import * as i18n from './utils/i18n'
import ThemeWrapper, { theme, assessments } from './theme.es'
import Layout from './src/components/Layout'
import addTranslations from './utils/translations'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
})

export async function onClientEntry() {
  await auth.init(client)
  const i18next = await i18n.init()

  addTranslations(assessments, i18next)
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

export const wrapPageElement = ({ element, props }) => (
  <Layout darkToolbar={props.location.pathname === '/'}>{element}</Layout>
)
