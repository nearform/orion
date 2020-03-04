import React from 'react'
import ThemeWrapper, { theme } from 'acme-admin-theme'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const muiTheme = createMuiTheme(theme.muiTheme)

export const wrapPageElement = ({ element }) => (
  <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    <ThemeWrapper>
      {element}
    </ThemeWrapper>
  </ThemeProvider>
)
