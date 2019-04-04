import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs/react'

import ButtonWithInput from '.'

const mockProps = {
  button: {
    label: text('label', 'Hello Button'),
    onClick: console.log
  },
  input: {
    onChange: console.log
  }
}

storiesOf('System/Blocks/ButtonWithInput', module)
  .addDecorator(jsxDecorator)
  .add('Basic Input with a Button Example', () => (
    <ButtonWithInput {...mockProps} />
  ))
