import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import { withStyles, Input } from '@material-ui/core'

const Container = withStyles({
  root: {
    marginBottom: 10,
    '& > * + *': { marginLeft: 10 },
  },
})(({ classes, children }) => <div className={classes.root}>{children}</div>)

storiesOf('material/Input', module)
  .addDecorator(jsxDecorator)
  .add('Input', () => (
    <Container>
      <Input />
    </Container>
  ))
