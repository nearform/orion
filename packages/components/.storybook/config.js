import React from 'react'
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from '@material-ui/core'
import { configure } from '@storybook/react'
import { setAddon, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import JSXAddon from 'storybook-addon-jsx'

import { theme } from '../../app/theme.es'

const withThemeDecorator = storyFn => (
  <MuiThemeProvider theme={createMuiTheme(theme.muiTheme)}>
    <CssBaseline />
    {storyFn()}
  </MuiThemeProvider>
)

addDecorator(withKnobs)
addDecorator(withThemeDecorator)
setAddon(JSXAddon)

if (process.env.NODE_ENV === 'test') {
  const { getFullPath, requireModules } = require('./require-context')
  /**
   * If we are in the test environment, we need to polyfill require.context for
   * CRA testing environment. It's no longer included in storyshots.
   * But this is the code from storyshots 3.4.11.
   */
  require.context = (
    directory,
    useSubdirectories = false,
    regExp = /^\.\//
  ) => {
    const fullPath = getFullPath(__dirname, directory)

    const keys = {}
    requireModules(keys, fullPath, '.', regExp, useSubdirectories)

    const req = f => keys[f]
    req.keys = () => Object.keys(keys)
    return req
  }
}

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
