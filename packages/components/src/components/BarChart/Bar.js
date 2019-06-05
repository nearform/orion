import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import classnames from 'classnames'
import T from 'prop-types'

function Bar({ classes, value, color, absolute, max, height }) {
  const percentage = `${value ? (value / max) * 100 : 0}%`

  const style = { width: percentage, height }
  if (color) style.backgroundColor = color

  return (
    <div className={classnames(classes.root, { [classes.absolute]: absolute })}>
      <div className={classes.bar} style={style} />
    </div>
  )
}

const styles = theme => ({
  root: {
    height: theme.spacing(4),
    padding: theme.spacing(0.5, 0),
    display: 'flex',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  bar: {
    backgroundColor: theme.palette.background.light,
    borderTopRightRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
  },
})

Bar.defaultProps = {
  // Don't set position: absolute unless told to by a parent
  // that has assigned position: relative in an appropriate place
  absolute: false,
  max: 100,
  height: '100%',
}

Bar.propTypes = {
  classes: T.object.isRequired,
  value: T.number,
  max: T.number,
  color: T.string,
  absolute: T.bool,
  height: T.oneOfType([T.string, T.number]),
}

export default withStyles(styles)(Bar)
