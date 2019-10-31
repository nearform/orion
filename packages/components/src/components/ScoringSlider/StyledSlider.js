import React from 'react'
import { withStyles } from '@material-ui/core'
import Slider from '@material-ui/core/Slider'
import T from 'prop-types'

const styles = theme => {
  const thumbWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(0.5),
    height: theme.spacing(4),
    width: theme.spacing(4),
    marginTop: '-8px',
    marginLeft: '-16px',
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

  const track = {
    borderTopLeftRadius: theme.spacing(1),
    borderBottomLeftRadius: theme.spacing(1),
    height: theme.spacing(2),
    '&$disabled': {
      '&::after': {
        ...disabledTrackGapFiller,
        right: `-${MUI_DISABLED_SLIDER_GAP}`,
      },
    },
  }
  const rail = {
    borderTopRightRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
    height: theme.spacing(2),
    '&$disabled': {
      ...disabledTrackGapFiller,
      left: `-${MUI_DISABLED_SLIDER_GAP}`,
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
    rail: {
      backgroundColor: theme.palette.background.default,
      opacity: 1,
      ...rail,
    },
    track,
    thumb: {
      ...thumbWrapper,
      '&$disabled': {
        // Stop MUI Slider's .disabled styles overriding ours
        ...thumbWrapper,
      },
    },
    thumbIcon: {
      color: theme.palette.text.hint,
    },
    primaryTrack: {
      backgroundColor: theme.palette.primary.main,
      ...track,
    },
    secondaryTrack: {
      backgroundColor: theme.palette.secondary.main,
      ...track,
    },
    primaryThumbIcon: {
      color: theme.palette.primary.main,
    },
    secondaryThumbIcon: {
      color: theme.palette.secondary.main,
    },
    disabled: {
      '& .MuiSlider-thumb': {
        ...thumbWrapper,
      },
    },
  }
}

const StyledSlider = function({
  color,
  classes: {
    primaryTrack,
    secondaryTrack,
    primaryThumbIcon,
    secondaryThumbIcon,
    thumbIcon,
    container,
    ...defaultClasses
  },
  ThumbComponent,
  ...props
}) {
  const customClasses = {
    primaryTrack,
    secondaryTrack,
    primaryThumbIcon,
    secondaryThumbIcon,
  }

  const trackClass = color
    ? customClasses[`${color}Track`]
    : defaultClasses.track

  const thumbIconClass = color ? customClasses[`${color}ThumbIcon`] : thumbIcon

  return (
    <Slider
      classes={{
        ...defaultClasses,
        track: trackClass,
      }}
      ThumbComponent={ThumbComponent(thumbIconClass)}
      {...props}
    />
  )
}

StyledSlider.propTypes = {
  color: T.oneOf(['primary', 'secondary']),
  ...Slider.propTypes,
}

export default withStyles(styles)(StyledSlider)
