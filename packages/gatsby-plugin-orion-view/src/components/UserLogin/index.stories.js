import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import Form from '.'

storiesOf('User Login', module)
  .addDecorator(jsxDecorator)
  .add('default', () => <Form />)
