import React from 'react'
import { configure } from '@storybook/react'
import { setAddon, addDecorator } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import JSXAddon from 'storybook-addon-jsx'
import { configureViewport } from '@storybook/addon-viewport'
import { ThemeProvider } from 'styled-components'
import { createTheme } from 'saluki'
import defaultTheme from 'saluki-theme-default'
import { withThemes } from 'storybook-styled-components'
import { KnowledgebaseTheme, OrangeTheme } from '~/system/theme'

const themes = {
  knowledgebaseTheme: createTheme(defaultTheme, KnowledgebaseTheme),
  orangeTheme: createTheme(defaultTheme, OrangeTheme)
}

addDecorator(withKnobs)
addDecorator(withThemes(themes))
setAddon(JSXAddon)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
