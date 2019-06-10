import React from 'react'
import { ClientContext } from 'graphql-hooks'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import ThemeWrapper, { theme } from '../../theme.es'

export default ({ children, client }) => (
  <ThemeProvider theme={createMuiTheme(theme.muiTheme)}>
    <CssBaseline />
    <ThemeWrapper>
      <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
    </ThemeWrapper>
  </ThemeProvider>
)
