import React from 'react'
import Layout from 'gatsby-plugin-orion-view/src/components/Layout'
import theme from 'gatsby-theme-acme'
import { CssBaseline } from '@material-ui/core'
import EditComponentProvider from './src/components/EditComponentProvider'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import components from './src/selectable-components'
import layouts from './src/layouts'

const muiTheme = createMuiTheme(theme)

export const wrapPageElement = ({ element }) => (
  <EditComponentProvider
    components={components}
    layouts={layouts}
    wrapper={Layout}
  >
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {element}
    </ThemeProvider>
  </EditComponentProvider>
)
