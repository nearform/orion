import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { configure } from '@storybook/react'
import { setAddon, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import JSXAddon from 'storybook-addon-jsx'
import { muiTheme } from 'storybook-addon-material-ui'
import { theme as nearformTheme } from 'nearform-theme'
import { theme as efqmTheme } from 'efqm-theme'

const withCssBaseline = storyFn => (
  <>
    <CssBaseline />
    {storyFn()}
  </>
)

addDecorator(withKnobs)
addDecorator(withCssBaseline)
addDecorator(
  muiTheme([
    { ...efqmTheme.muiTheme, themeName: 'EFQM' },
    { ...nearformTheme.muiTheme, themeName: 'NearForm' },
  ])
)
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
