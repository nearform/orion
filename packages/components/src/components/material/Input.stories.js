import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { Input, OutlinedInput } from '@material-ui/core'

import Container from './Container'

storiesOf('material/Input', module)
  .addDecorator(jsxDecorator)
  .add('Inputs', () => (
    <>
      <Container>
        <Input placeholder="input" />
        <Input multiline placeholder="multiline" />
      </Container>
      <Container>
        <OutlinedInput placeholder="outlined input" />
        <OutlinedInput multiline placeholder="outlined multiline" />
      </Container>
    </>
  ))
