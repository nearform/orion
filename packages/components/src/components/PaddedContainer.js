import React from 'react'
import T from 'prop-types'
import { withStyles } from '@material-ui/core'
import classnames from 'classnames'

function PaddedContainer({ classes, className, ...props }) {
  return <div className={classnames(classes.root, className)} {...props} />
}

PaddedContainer.propTypes = {
  classes: T.object.isRequired,
  className: T.string,
}

const styles = theme => {
  const horizontalPadding = theme.spacing.unit * 10

  return {
    root: {
      margin: '0 auto',
      maxWidth: theme.breakpoints.values.lg + horizontalPadding * 2,
      padding: `0 ${horizontalPadding}px`,
    },
  }
}

export default withStyles(styles)(PaddedContainer)
