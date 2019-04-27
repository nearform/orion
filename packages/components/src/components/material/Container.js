import React from 'react'
import { withStyles } from '@material-ui/core'

export default withStyles({
  root: {
    padding: 10,
    marginBottom: 10,
    '& > * + *': { marginLeft: 10 },
  },
})(({ classes, children }) => <div className={classes.root}>{children}</div>)
