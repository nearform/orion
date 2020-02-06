import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { theme as nearformTheme } from 'nearform-theme'
import { theme as efqmTheme } from 'efqm-theme'

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
    { ...efqmTheme.muiTheme, themeName: 'EFQM' },
    { ...nearformTheme.muiTheme, themeName: 'NearForm' },
  ])
)
