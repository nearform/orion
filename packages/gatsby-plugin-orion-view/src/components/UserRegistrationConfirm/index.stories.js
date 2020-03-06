import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import UserRegistrationConfirm from '.'

storiesOf('User Registration Confirm', module)
  .addDecorator(jsxDecorator)
  .add('default', () => <UserRegistrationConfirm />)
