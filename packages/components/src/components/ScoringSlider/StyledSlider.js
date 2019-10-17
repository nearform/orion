import React from 'react'
import { withStyles } from '@material-ui/core'
import Slider from '@material-ui/lab/Slider'
import T from 'prop-types'

const styles = theme => {
  const thumbIcon = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  const thumbWrapper = {
    borderRadius: theme.spacing(0.5),
    height: theme.spacing(4),
    width: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
  }

  // Fill MUI Slider's hard-coded 6px gap between disabled tracks and thumb
  const MUI_DISABLED_SLIDER_GAP = '6px' // Counters width of `calc(${percent}% - 6px)` in
  // https://github.com/mui-org/material-ui/blob/f4dc7bbf32b3c9655e12b73419e5e55b9a6c0532/packages/material-ui-lab/src/Slider/Slider.js#L482

  const disabledTrackGapFiller = {
    content: '""',
    position: 'absolute',
    width: MUI_DISABLED_SLIDER_GAP,
    height: '100%',
    background: 'inherit',
  }

  const trackBefore = {
    borderTopLeftRadius: theme.spacing(1),
    borderBottomLeftRadius: theme.spacing(1),
    '&$disabled': {
      '&::after': {
        ...disabledTrackGapFiller,
        right: `-${MUI_DISABLED_SLIDER_GAP}`,
      },
    },
  }
  const trackAfter = {
    borderTopRightRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
    '&$disabled': {
      '&::after': {
        ...disabledTrackGapFiller,
        left: `-${MUI_DISABLED_SLIDER_GAP}`,
      },
    },
  }

  return {
    container: {
      // Leave enough surrounding space to not clip thumb shadow and drag effect
      margin: theme.spacing(-2.5, -0.5, -2.5, -2.5),
      padding: theme.spacing(4.5),
      width: `calc(100% + ${theme.spacing(5)}px)`,
    },
    track: {
      height: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      opacity: 1,
    },
    trackBefore,
    trackAfter,
    thumb: {
      ...thumbWrapper,
      '&$disabled': {
        // Stop MUI Slider's .disabled styles overriding ours
        ...thumbWrapper,
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
