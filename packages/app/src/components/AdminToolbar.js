import React from 'react'
import { Link, withStyles } from '@material-ui/core'

import NavLink from './NavLink'

function AdminToolbar({ classes }) {
  return (
    <div className={classes.root}>
      <Link component={NavLink} to="pending-users">
        Pending users
      </Link>
      <Link component={NavLink} to="groups">
        Groups
      </Link>
    </div>
  )
}

const styles = {
  root: {
    textAlign: 'right',
    marginRight: 10,
    '& > * + *': {
      marginLeft: 10,
    },
  },
}

export default withStyles(styles)(AdminToolbar)
