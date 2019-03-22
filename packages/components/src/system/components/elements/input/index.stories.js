import React from 'react'
import { ThemeProvider } from 'styled-components/macro'
import { theme } from 'saluki'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { action } from '@storybook/addon-actions'
import { wInfo } from '../../../../../.storybook/utils'

import Input from '.'

storiesOf('System/Components/Input', module)
  .addDecorator(jsxDecorator)
  .addDecorator(
    wInfo(`
      ### Notes
      This is the most basic input component:

      ### To use this Storybook
      Explore the panels on the left.
    `)
  )
  .addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .add('Basic Input Example', () => <Input onChange={action('changed')} />)
