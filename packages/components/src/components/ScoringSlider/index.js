import React from 'react'
import T from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'

import ChartTicks from '../ChartTicks'
import StyledSlider from './StyledSlider'
import Thumb from './Thumb'

function ScoringSlider({ color, classes, label, ...props }) {
  return (
    <div>
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
  label: T.string.isRequired,
  ...StyledSlider.propTypes,
}

const styles = theme => ({
  label: {
    color: theme.palette.primary.dark,
  },
})

export default withStyles(styles)(ScoringSlider)
