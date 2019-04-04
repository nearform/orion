import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { boolean } from '@storybook/addon-knobs/react'

import Checkbox from '.'

storiesOf('System/Elements/CheckBox', module)
  .addDecorator(jsxDecorator)
  .add('Basic CheckBox Example', () => (
    <Checkbox checked={boolean('checked', false)} onChange={console.log} />
  ))
