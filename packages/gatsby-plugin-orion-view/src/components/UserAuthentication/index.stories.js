import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import UserAuthentication from '.'

storiesOf('User Registration', module)
  .addDecorator(jsxDecorator)
  .add('default', () => <UserAuthentication />)
