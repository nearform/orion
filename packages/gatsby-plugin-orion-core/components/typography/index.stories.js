import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { Typography } from '@material-ui/core'

storiesOf('typography', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => {
    return (
      <div>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="h5">Heading 5</Typography>
        <Typography variant="p">body </Typography>
      </div>
    )
  })
