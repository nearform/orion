import React, { Fragment } from 'react'
import { configure } from '@storybook/react'
import { setAddon, addDecorator } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import JSXAddon from 'storybook-addon-jsx'
import { configureViewport } from '@storybook/addon-viewport'
import { createTheme } from 'saluki'
import defaultTheme from 'saluki-theme-default'
import { withThemes } from 'storybook-styled-components'
import { KnowledgebaseTheme, OrangeTheme } from '~/system/theme'
import Typography from '~/system/theme/typography'

const themes = {
  knowledgebaseTheme: createTheme(defaultTheme, KnowledgebaseTheme),
  orangeTheme: createTheme(defaultTheme, OrangeTheme)
}

const TypographyDecorator = story => (
  <Fragment>
    <Typography />
    {story()}
  </Fragment>
)

addDecorator(withKnobs)
addDecorator(withThemes(themes))
setAddon(JSXAddon)
addDecorator(TypographyDecorator)

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
