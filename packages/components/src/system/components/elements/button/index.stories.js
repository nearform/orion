import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text, boolean } from '@storybook/addon-knobs/react'

import Button from '.'

storiesOf('System/Elements/Button', module)
  .addDecorator(jsxDecorator)
  .add('Basic Button Example', () => (
    <Button inverted={boolean('inverted', false)} onClick={console.log}>
      {text('label', 'Hello World Button')}
    </Button>
  ))
