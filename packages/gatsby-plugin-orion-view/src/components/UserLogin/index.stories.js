import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import UserLogin from '.'

storiesOf('View/Interactive-forms/User Login', module)
  .addDecorator(jsxDecorator)
  .add('default', () => <UserLogin />)
