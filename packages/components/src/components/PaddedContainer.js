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

const styles = theme => ({
  root: {
    padding: theme.spacing(0, 10),
  },
})

export default withStyles(styles)(PaddedContainer)
