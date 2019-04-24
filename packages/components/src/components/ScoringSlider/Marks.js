import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import classnames from 'classnames'
import T from 'prop-types'

const marksStyles = theme => ({
  root: {
    margin: `-4px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    display: 'flex',
    justifyContent: 'space-between',
  },
  tick: {
    position: 'relative',
    '&::before': {
      position: 'absolute',
      top: 0,
      height: 6,
      width: 1,
      backgroundColor: theme.palette.background.dark,
      content: '""',
    },
    '&::after': {
      position: 'absolute',
      top: 8,
      transform: 'translateX(-50%)',
    },
  },
  tick0: {
    '&::before': {
      background: 'none',
    },
    '&::after': {
      background: 'none',
    },
  },
  tick1: {
    '&::after': {
      content: '"25"',
    },
  },
  tick2: {
    '&::after': {
      content: '"50"',
    },
  },
  tick3: {
    '&::after': {
      content: '"75"',
    },
  },
  tick4: {
    '&::after': {
      content: '"100"',
    },
  },
})

function Marks({ classes }) {
  return (
    <div className={classes.root}>
      {new Array(5).fill(null).map((_, i) => (
        <Typography
          key={i}
          variant="h4"
          className={classnames(classes.tick, classes[`tick${i}`])}
          color="secondary"
        />
      ))}
    </div>
  )
}

Marks.propTypes = {
  classes: T.object.isRequired,
}

export default withStyles(marksStyles)(Marks)
