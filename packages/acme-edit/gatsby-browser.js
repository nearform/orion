import React from 'react'
import Layout from './src/components/Layout'
import ThemeWrapper, { theme } from 'acme-admin-theme'
import { ComponentProvider } from 'gatsby-plugin-orion-view'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import { components } from 'acme-view/src/components'
import { layouts } from 'acme-view/src/layouts'

const muiTheme = createMuiTheme(theme.muiTheme)

export const wrapPageElement = ({ element }) => (
  <ComponentProvider components={components} layouts={layouts}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeWrapper>
        <Layout>
          {element}
        </Layout>
      </ThemeWrapper>
    </ThemeProvider>
  </ComponentProvider>
)
