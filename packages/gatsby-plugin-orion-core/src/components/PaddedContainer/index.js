import React from 'react'
import T from 'prop-types'
import { withStyles } from '@material-ui/core'
import clsx from 'clsx'

function PaddedContainer({ classes, className, ...props }) {
  return <div className={clsx(classes.root, className)} {...props} />
}

PaddedContainer.propTypes = {
  classes: T.object.isRequired,
  className: T.string,
}

const styles = theme => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 4),
    },
    [theme.breakpoints.up('md')]: {
      margin: 'auto',
      maxWidth: 1120,
    },
  },
})

export default withStyles(styles)(PaddedContainer)
