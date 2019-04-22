import React from 'react'
import Amplify, { Auth, Hub } from 'aws-amplify'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from '@material-ui/core'

import ThemeWrapper, { theme } from './theme.js'

import awsConfig from './src/aws-exports'
import Layout from './src/components/layout'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
})

const authListener = event => {
  if (event.payload.event === 'signIn') {
    setClientToken(event.payload.data.signInUserSession)
  }
}

Hub.listen('auth', authListener)

const setClientToken = session => {
  client.setHeader('Authorization', `Bearer ${session.idToken.jwtToken}`)
}

export async function onClientEntry() {
  Amplify.configure(awsConfig)

  try {
    const currentSession = await Auth.currentSession()

    setClientToken(currentSession)
  } catch (err) {
    // no authenticated user, it's fine
  }
}

export const wrapRootElement = ({ element }) => {
  return (
    <ClientContext.Provider value={client}>
      <MuiThemeProvider theme={createMuiTheme(theme.muiTheme)}>
        <ThemeWrapper>
          <CssBaseline />
          {element}
        </ThemeWrapper>
      </MuiThemeProvider>
    </ClientContext.Provider>
  )
}

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}
