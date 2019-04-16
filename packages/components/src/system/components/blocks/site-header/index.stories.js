import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import SiteHeader from '.'

storiesOf('System/Blocks/SiteHeader', module)
  .addDecorator(jsxDecorator)
  .add('Basic Site Header', () => <SiteHeader />)
