import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'

import EmbededVideo from './EmbededVideo'
import { Card, withStyles } from '@material-ui/core'

const Section = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(3),
    width: '60%',
  },
}))(Card)

storiesOf('EmbededVideo', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => (
    <Section>
      <EmbededVideo
        url={text('Video URL', 'https://www.youtube.com/watch?v=NpEaa2P7qZI')}
      />
    </Section>
  ))
