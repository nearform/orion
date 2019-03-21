import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { wInfo } from './utils'

storiesOf('Welcome', module)
  .addDecorator(jsxDecorator)
  .addDecorator(
  wInfo(`
    ### Notes
    Hello world!:
    ### Usage
    ~~~js
    <Button>Click here</Button>
    ~~~
    ### To use this Storybook
    Explore the panels on the left.
  `))
   .add('Welcome story 🦄', () => <div>This is an example component</div>)

