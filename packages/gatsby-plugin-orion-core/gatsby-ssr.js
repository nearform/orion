import React from 'react'
import AuthWrapper from 'gatsby-plugin-orion-core/src/components/AuthWrapper'
import RootWrapper from 'gatsby-plugin-orion-core/src/components/RootWrapper'
import fetch from 'node-fetch'
import { GraphQLClient } from 'graphql-hooks'
import { createMuiTheme } from '@material-ui/core/styles'

import ThemeWrapper, { theme } from 'acme-admin-theme'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

const muiTheme = createMuiTheme(theme.muiTheme)

const AuthInitWrapper = ({ element }) => {
  return (
    <RootWrapper client={client} theme={muiTheme} ThemeWrapper={ThemeWrapper}>
      <AuthWrapper>{element}</AuthWrapper>
    </RootWrapper>
  )
}

export const wrapRootElement = ({ element }) => (
  <AuthInitWrapper element={element} />
)
