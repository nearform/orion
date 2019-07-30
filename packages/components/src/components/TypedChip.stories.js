import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text, select, radio } from '@storybook/addon-knobs'

import _TypedChip from './TypedChip'
import { Typography, Card, withStyles } from '@material-ui/core'
const TypedChip = withStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}))(_TypedChip)
const Section = withStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(3),
  },
}))(Card)

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
