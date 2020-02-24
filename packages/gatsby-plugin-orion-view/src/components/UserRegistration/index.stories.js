import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import UserRegistration from '.'

storiesOf('User Registration', module)
  .addDecorator(jsxDecorator)
  .add('default', () => <UserRegistration />)
