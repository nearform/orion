import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'

import { makeStyles } from '@material-ui/core'
import MarkdownEditor from './MarkdownEditor'

const value = text('Content', 'Example text')

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(3),
    width: '80%',
  },
}))

storiesOf('Edit/Interactive/MarkdownEditor', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => {
    const classes = useStyles()

    return (
      <div className={classes.root}>
        <MarkdownEditor content={value} onChange={() => {}} />
      </div>
    )
  })
