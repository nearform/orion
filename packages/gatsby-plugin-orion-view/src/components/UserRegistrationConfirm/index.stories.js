import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import UserRegistrationConfirm from '.'

storiesOf('View/Interactive-forms/User Registration Confirm', module)
  .addDecorator(jsxDecorator)
  .add('default', () => <UserRegistrationConfirm />)
