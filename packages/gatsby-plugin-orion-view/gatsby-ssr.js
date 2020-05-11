import React from 'react'
import Layout from './src/components/Layout'
import theme from 'gatsby-theme-acme'
import { ViewComponentProvider } from './src/components/vie'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import components from './src/selectable-components'
import layouts from './src/layouts'

const muiTheme = createMuiTheme(theme)

export const wrapPageElement = ({ element, props }) => (
  <ViewComponentProvider components={components} layouts={layouts}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Layout menu={props.pageContext.menu} page={props.pageContext.page}>
        {element}
      </Layout>
    </ThemeProvider>
  </ViewComponentProvider>
)
