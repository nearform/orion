import React, { useEffect, useState } from 'react'
import { ClientContext } from 'graphql-hooks'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { initGraphQLClient, makeGraphQLClient } from '../../utils/graphql'

import ThemeWrapper, { theme } from 'acme-admin-theme'

const client = makeGraphQLClient(process.env.GATSBY_GRAPHQL_API)
const muiTheme = createMuiTheme(theme.muiTheme)

function RootWrapper({ children }) {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false)
  
  useEffect(() => {
    const init = async () => {
      await initGraphQLClient(client)
      setIsAuthInitialized(true)
    }

    init()
  }, [])

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeWrapper>
        <ClientContext.Provider value={client}>
          {children}
        </ClientContext.Provider>
      </ThemeWrapper>
    </ThemeProvider>
  )
}

export default RootWrapper
