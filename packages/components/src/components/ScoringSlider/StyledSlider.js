import React from 'react'
import { withStyles } from '@material-ui/core'
import Slider from '@material-ui/lab/Slider'
import T from 'prop-types'

const styles = theme => {
  const trackBefore = {
    borderTopLeftRadius: theme.spacing.unit,
    borderBottomLeftRadius: theme.spacing.unit,
  }
  const thumbIcon = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return {
    container: {
      padding: theme.spacing.unit * 2,
    },
    track: {
      height: theme.spacing.unit * 2,
      backgroundColor: theme.palette.background.default,
      opacity: 1,
    },
    trackBefore,
    trackAfter: {
      borderTopRightRadius: theme.spacing.unit,
      borderBottomRightRadius: theme.spacing.unit,
    },
    thumb: {
      borderRadius: theme.spacing.unit / 2,
      height: theme.spacing.unit * 4,
      width: theme.spacing.unit * 4,
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[1],
      '&$disabled': {
        backgroundColor: theme.palette.background.default,
        height: theme.spacing.unit * 4,
        width: theme.spacing.unit * 4,
      },
    },
    thumbIcon: {
      color: theme.palette.text.hint,
      ...thumbIcon,
    },
    primaryTrackBefore: {
      backgroundColor: theme.palette.primary.main,
      ...trackBefore,
    },
    secondaryTrackBefore: {
      backgroundColor: theme.palette.secondary.main,
      ...trackBefore,
    },
    primaryThumbIcon: {
      color: theme.palette.primary.main,
      ...thumbIcon,
    },
    secondaryThumbIcon: {
      color: theme.palette.secondary.main,
      ...thumbIcon,
    },
    disabled: {},
  }
}

const StyledSlider = function({
  color,
  classes: {
    primaryTrackBefore,
    secondaryTrackBefore,
    primaryThumbIcon,
    secondaryThumbIcon,
    ...defaultClasses
  },
  ...props
}) {
  const customClasses = {
    primaryTrackBefore,
    secondaryTrackBefore,
    primaryThumbIcon,
    secondaryThumbIcon,
  }

  const trackBeforeClass = color
    ? customClasses[`${color}TrackBefore`]
    : defaultClasses.trackBefore
  const thumbIconClass = color
    ? customClasses[`${color}ThumbIcon`]
    : defaultClasses.thumbIcon

  return (
    <Slider
      classes={{
        ...defaultClasses,
        trackBefore: trackBeforeClass,
        thumbIcon: thumbIconClass,
      }}
      {...props}
    />
  )
}

StyledSlider.propTypes = {
  color: T.oneOf(['primary', 'secondary']),
  ...Slider.propTypes,
}

export default withStyles(styles)(StyledSlider)
