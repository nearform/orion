import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import { Button, withStyles } from '@material-ui/core'

const Container = withStyles({
  root: {
    marginBottom: 10,
    '& > * + *': { marginLeft: 10 },
  },
})(({ classes, children }) => <div className={classes.root}>{children}</div>)

storiesOf('material/Button', module)
  .addDecorator(jsxDecorator)
  .add('Button', () => (
    <>
      <Container>
        <Button>default</Button>
        <Button variant="contained">default contained</Button>
        <Button variant="outlined">default outlined</Button>
        <Button variant="text">default text</Button>
      </Container>
      <Container>
        <Button color="primary">primary</Button>
        <Button color="primary" variant="contained">
          primary contained
        </Button>
        <Button color="primary" variant="outlined">
          primary outlined
        </Button>
        <Button color="primary" variant="text">
          primary text
        </Button>
      </Container>
      <Container>
        <Button color="secondary">secondary</Button>
        <Button color="secondary" variant="contained">
          secondary contained
        </Button>
        <Button color="secondary" variant="outlined">
          secondary outlined
        </Button>
        <Button color="secondary" variant="text">
          secondary text
        </Button>
      </Container>
    </>
  ))
