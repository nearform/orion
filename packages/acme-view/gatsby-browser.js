import React from 'react'
import Layout from './src/components/Layout'
import ThemeWrapper, { theme } from 'gatsby-theme-acme'
import { ViewComponentProvider } from 'gatsby-plugin-orion-view'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import components from './src/components'
import layouts from './src/layouts'

const muiTheme = createMuiTheme(theme.muiTheme)

export const wrapPageElement = ({ element, props }) => (
  <ViewComponentProvider components={components} layouts={layouts}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeWrapper>
        <Layout page={props.pageContext.page}>
          {element}
        </Layout>
      </ThemeWrapper>
    </ThemeProvider>
  </ViewComponentProvider>
)
