import React from 'react'
import ThemeWrapper, { theme } from 'acme-admin-theme'
import { ComponentProvider } from 'gatsby-plugin-orion-view'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import { components } from './src/components'
import { layouts } from './src/layouts'

const muiTheme = createMuiTheme(theme.muiTheme)

export const wrapPageElement = ({ element }) => (
  <ComponentProvider components={components} layouts={layouts}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeWrapper>
        {element}
      </ThemeWrapper>
    </ThemeProvider>
  </ComponentProvider>
)
