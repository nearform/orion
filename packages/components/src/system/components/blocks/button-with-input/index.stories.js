import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { wInfo } from '../../../../../.storybook/utils'

import ButtonWithInput from '.'

const mockProps = {
  button: {
    label: text('label', 'Hello Button'),
    onClick: () => action('clicked')
  },
  input: {
    onChange: () => action('changed')
  }
}

storiesOf('System/Blocks/ButtonWithInput', module)
  .addDecorator(jsxDecorator)
  .addDecorator(
    wInfo(`
      ### Notes
      This is a basic block with input and a button:
    `)
  )
  .add('Basic Input with a Button Example', () => (
    <ButtonWithInput {...mockProps} />
  ))
