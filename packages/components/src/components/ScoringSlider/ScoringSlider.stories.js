import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { number, text } from '@storybook/addon-knobs'
import { withStyles } from '@material-ui/core'

import ScoringSlider from './'

const Container = withStyles(theme => ({
  root: {
    padding: 50,
    backgroundColor: theme.palette.background.light,
    '& > * + *': {
      marginTop: 50,
    },
  },
}))(({ children, classes }) => <div className={classes.root}>{children}</div>)

storiesOf('ScoringSlider', module)
  .addDecorator(jsxDecorator)
  .add('ScoringSlider', () => (
    <Container>
      {[0, 25, 50, 75, 100].map(v => (
        <ScoringSlider
          key={v}
          label={text('Label', `Slider ${v}`)}
          value={number('Value', v)}
        />
      ))}
    </Container>
  ))
  .add('primary', () => (
    <Container>
      {[0, 25, 50, 75, 100].map(v => (
        <ScoringSlider
          key={v}
          label={text('Label', `Slider ${v}`)}
          value={number('Value', v)}
          color="primary"
        />
      ))}
    </Container>
  ))
  .add('secondary', () => (
    <Container>
      {[0, 25, 50, 75, 100].map(v => (
        <ScoringSlider
          key={v}
          label={text('Label', `Slider ${v}`)}
          value={number('Value', v)}
          color="secondary"
        />
      ))}
    </Container>
  ))
  .add('disabled', () => (
    <Container>
      {[0, 25, 50, 75, 100].map(v => (
        <ScoringSlider
          disabled
          key={v}
          label={text('Label', `Slider ${v}`)}
          value={number('Value', v)}
        />
      ))}
    </Container>
  ))
