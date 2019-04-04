import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { ThemeProvider } from 'styled-components'
import { createTheme } from 'saluki'
import defaultTheme from 'saluki-theme-default'
import fetch from 'node-fetch'

import customTheme from './src/utils/theme'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  fetch,
})

export const wrapRootElement = ({ element }) => {
  return (
    <ClientContext.Provider value={client}>
      <ThemeProvider theme={createTheme(defaultTheme, customTheme)}>
        {element}
      </ThemeProvider>
    </ClientContext.Provider>
  )
}
