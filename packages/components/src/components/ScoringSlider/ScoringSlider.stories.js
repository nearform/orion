import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { number, text, withKnobs } from '@storybook/addon-knobs'
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

const intervals = [0, 25, 50, 75, 100]

storiesOf('ScoringSlider', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .add('ScoringSlider', () => (
    <Container>
      {intervals.map((v, i) => {
        const label = `Slider ${i}`
        return (
          <ScoringSlider
            key={v}
            label={text(`${label} label`, label)}
            value={number(label, v)}
          />
        )
      })}
    </Container>
  ))
  .add('primary', () => (
    <Container>
      {intervals.map((v, i) => {
        const label = `Slider ${i}`
        return (
          <ScoringSlider
            key={v}
            label={text(`${label} label`, label)}
            value={number(label, v)}
            color="primary"
          />
        )
      })}
    </Container>
  ))
  .add('secondary', () => (
    <Container>
      {intervals.map((v, i) => {
        const label = `Slider ${i}`
        return (
          <ScoringSlider
            key={v}
            label={text(`${label} label`, label)}
            value={number(label, v)}
            color="secondary"
          />
        )
      })}
    </Container>
  ))
  .add('disabled', () => (
    <Container>
      {intervals.map((v, i) => {
        const label = `Slider ${i}`
        return (
          <ScoringSlider
            key={v}
            label={text(`${label} label`, label)}
            value={number(label, v)}
            disabled
          />
        )
      })}
    </Container>
  ))
