import React, { useState, useEffect } from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import {
  addTranslations,
  RootWrapper,
  Layout,
  ThemeWrapper,
  theme,
} from 'components'
import * as auth from './utils/auth'
import { AuthInitContext } from './src/utils/auth'
import * as i18n from './utils/i18n'
import AppFooter from './src/components/AppFooter'
import MainToolbar from './src/components/MainToolbar'
import './src/styles/global.css'

const muiTheme = createMuiTheme(theme.muiTheme)

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
})

export async function onClientEntry() {
  const i18next = await i18n.init()
  addTranslations('assessments', i18next)
}

const InitializedWrapper = ({ element }) => {
  const [isInitialised, setIsInitialised] = useState(false)
  useEffect(() => {
    const init = async () => {
      await auth.init(client)
      setIsInitialised(true)
    }
    init()
  }, [])

  return (
    <AuthInitContext.Provider value={isInitialised}>
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
}
export const wrapRootElement = ({ element }) => {
  return <InitializedWrapper element={element} />
}

export const wrapPageElement = ({ element, props }) => (
  <Layout
    darkToolbar={props.location.pathname === '/'}
    AppFooter={AppFooter}
    MainToolbar={MainToolbar}
  >
    {element}
  </Layout>
)
