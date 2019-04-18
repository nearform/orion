import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { number, text } from '@storybook/addon-knobs'
import { withStyles } from '@material-ui/core'

import ScoringSlider from './ScoringSlider'

const Container = withStyles(theme => ({
  root: {
    padding: 50,
    backgroundColor: theme.palette.background.paper,
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
