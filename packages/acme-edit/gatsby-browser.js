import React from 'react'
import ThemeWrapper, { theme } from 'gatsby-theme-acme'
import { CssBaseline } from '@material-ui/core'
import { EditComponentProvider } from 'gatsby-plugin-orion-edit'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import components from './src/components'
import layouts from './src/layouts'

const muiTheme = createMuiTheme(theme.muiTheme)

export const wrapPageElement = ({ element }) => (
  <EditComponentProvider components={components} layouts={layouts}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeWrapper>{element}</ThemeWrapper>
    </ThemeProvider>
  </EditComponentProvider>
)
