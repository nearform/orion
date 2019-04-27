import React from 'react'
import { withStyles } from '@material-ui/core'

function ImagePlaceholder({ classes, children }) {
  return <div className={classes.root}>{children}</div>
}

const styles = theme => ({
  root: {
    flex: 1,
    height: '100%',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.light,
  },
})

export default withStyles(styles)(ImagePlaceholder)
