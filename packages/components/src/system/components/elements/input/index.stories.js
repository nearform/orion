import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import Input from '.'

storiesOf('System/Elements/Input', module)
  .addDecorator(jsxDecorator)
  .add('Basic Input Example', () => (
    <Input placeholder={'Your email address'} onChange={console.log} />
  ))
