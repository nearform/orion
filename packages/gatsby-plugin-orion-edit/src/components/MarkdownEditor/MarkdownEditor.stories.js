import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'

import { Container, withStyles } from '@material-ui/core'
import MarkdownEditor from './MarkdownEditor'

const Section = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(3),
    width: '80%',
  },
}))(Container)

const value = text('Content', 'Example text')

storiesOf('MarkdownEditor', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => (
    <Section>
      <MarkdownEditor content={value} onChange={() => {}} />
    </Section>
  ))
