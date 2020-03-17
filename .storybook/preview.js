import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { muiTheme } from 'storybook-addon-material-ui'
import theme from 'gatsby-theme-acme'

const withCssBaseline = storyFn => (
  <>
    <CssBaseline />
    {storyFn()}
  </>
)

addDecorator(withKnobs)
addDecorator(withCssBaseline)
addDecorator(
  muiTheme([
    { ...theme, themeName: 'Acme' },
  ])
)
