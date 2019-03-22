import { configure } from '@storybook/react'
import { setAddon, addDecorator } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import { withConsole } from '@storybook/addon-console'
import JSXAddon from 'storybook-addon-jsx'
import { configureViewport } from '@storybook/addon-viewport'

addDecorator(withKnobs)
addDecorator((storyFn, context) => withConsole()(storyFn)(context))
setAddon(JSXAddon)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  require('./welcome')
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
