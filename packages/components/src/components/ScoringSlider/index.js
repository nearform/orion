import React from 'react'
import T from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'

import ChartTicks from '../ChartTicks'
import StyledSlider from './StyledSlider'
import Thumb from './Thumb'

function ScoringSlider({ color, classes, label, ...props }) {
  return (
    <div className={classes.container}>
      <Typography
        id="label"
        className={classes.label}
        variant="h4"
        gutterBottom
      >
        {label}
      </Typography>
      <StyledSlider
        color={color}
        className={classes.slider}
        aria-labelledby="label"
        thumb={<Thumb value={props.value} />}
        {...props}
      />
      <ChartTicks variant="below" />
    </div>
  )
}

ScoringSlider.propTypes = {
  classes: T.object.isRequired,
  label: T.string,
  ...StyledSlider.propTypes,
}

const styles = theme => ({
  container: {
    position: 'relative',
  },
  label: {
    color: theme.palette.primary.dark,
    position: 'absolute',
    left: 0,
    top: -35,
    width: '85%',
    marginTop: theme.spacing(2),
  },
  slider: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
})

export default withStyles(styles)(ScoringSlider)
