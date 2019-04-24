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
        <Button variant="contained">contained</Button>
        <Button variant="outlined">outlined</Button>
      </Container>
      <Container>
        <Button color="primary">primary</Button>
        <Button color="primary" variant="contained">
          primary contained
        </Button>
        <Button color="primary" variant="outlined">
          primary outlined
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
      </Container>
      <Container>
        <Button color="primary" variant="contained" size="large">
          primary contained large
        </Button>
        <Button color="primary" variant="contained" size="medium">
          primary contained medium
        </Button>
        <Button color="primary" variant="contained" size="small">
          primary contained small
        </Button>
      </Container>
      <Container>
        <Button color="secondary" variant="contained" size="large">
          secondary contained large
        </Button>
        <Button color="secondary" variant="contained" size="medium">
          secondary contained medium
        </Button>
        <Button color="secondary" variant="contained" size="small">
          secondary contained small
        </Button>
      </Container>
    </>
  ))
