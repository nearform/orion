import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text, select } from '@storybook/addon-knobs'

import { withStyles } from '@material-ui/core'
import _TypedChip from './TypedChip'
const TypedChip = withStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}))(_TypedChip)

storiesOf('TypedChip', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => (
    <TypedChip
      name={text('Name', 'Chip Name')}
      type={text('Type', 'chip type')}
      color={select('Color', ['primary', 'secondary'], 'primary')}
      onDelete={() => {}}
    />
  ))
