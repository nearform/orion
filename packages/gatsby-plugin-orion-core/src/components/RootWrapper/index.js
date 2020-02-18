import React from 'react'
import T from 'prop-types'
import { ClientContext } from 'graphql-hooks'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

function RootWrapper({ children, client, theme, ThemeWrapper }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeWrapper>
        <ClientContext.Provider value={client}>
          {children}
        </ClientContext.Provider>
      </ThemeWrapper>
    </ThemeProvider>
  )
}

RootWrapper.propTypes = {
  children: T.node.isRequired,
  client: T.object.isRequired,
  theme: T.object.isRequired,
  ThemeWrapper: T.elementType.isRequired,
}

export default RootWrapper
