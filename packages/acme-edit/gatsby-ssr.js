import React from 'react'
import ThemeWrapper, { theme } from 'gatsby-theme-acme'
import { ViewComponentProvider } from 'gatsby-plugin-orion-view'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import viewComponents from 'acme-view/src/components'
import viewLayouts from 'acme-view/src/layouts'

const muiTheme = createMuiTheme(theme.muiTheme)

export const wrapPageElement = ({ element }) => (
  <ViewComponentProvider components={viewComponents} layouts={viewLayouts}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeWrapper>
        {element}
      </ThemeWrapper>
    </ThemeProvider>
  </ViewComponentProvider>
)
