import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import classnames from 'classnames'
import T from 'prop-types'

const TICKS_COUNT = 6

function ChartTicks({ classes, children, variant, height }) {
  const getTickContentClass = i => {
    if (variant === 'across') return ''
    if (variant === 'below' && i === 0) return 'tickGap'
    return `tick${i}`
  }

  return (
    <div
      className={classnames(classes.root, classes[variant])}
      style={height && { height }}
    >
      {new Array(TICKS_COUNT).fill(null).map((_, i) => (
        <Typography
          key={i}
          variant="h4"
          className={classnames(
            classes.tick,
            classes[getTickContentClass(i)],
            classes[`${variant}Tick`]
          )}
          color="secondary"
        />
      ))}
      {children}
    </div>
  )
}

const styles = theme => {
  const chartTickStyles = {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    across: {
      position: 'relative',
    },
    below: {
      width: '98%',
    },
    tick: {
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
      },
      '&::after': {
        position: 'absolute',
        transform: 'translateX(-50%)',
      },
    },
    acrossTick: {
      '&::before': {
        height: '100%',
        width: 1,
        backgroundColor: theme.palette.background.dark,
        content: '""',

        // Ensure lines are just behind, not under, content that starts at this exact value
        marginLeft: -1,
      },
    },
    belowTick: {
      margin: theme.spacing(5, 0, 3, 0),
      '&::before': {
        height: 6,
        width: 1,
        backgroundColor: theme.palette.background.dark,
      },
      '&::after': {
        top: theme.spacing(1),
      },
    },
    aboveTick: {
      '&::after': {
        bottom: theme.spacing(1),
      },
    },
    tickGap: {
      '&::before': {
        background: 'none',
      },
      '&::after': {
        background: 'none',
      },
    },
  }

  for (let i = 0; i < TICKS_COUNT; i++) {
    chartTickStyles[`tick${i}`] = {
      '&::after': {
        content: `"${i * (100 / (TICKS_COUNT - 1))}"`,
      },
    }
  }

  return chartTickStyles
}

ChartTicks.propTypes = {
  children: T.node,
  classes: T.object.isRequired,
  variant: T.oneOf(['below', 'above', 'across']),
  height: T.oneOfType([T.string, T.number]),
}

export default withStyles(styles)(ChartTicks)
