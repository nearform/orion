import React from 'react'
import { withStyles, Link } from '@material-ui/core'

import { isAdmin } from '../utils/auth'
import NavLink from './NavLink'

function MainToolbar({ classes }) {
  return (
    <div className={classes.root}>
      <Link component={NavLink} partial={false} to="/">
        Home
      </Link>
      {isAdmin() && (
        <Link component={NavLink} to="/admin">
          Admin
        </Link>
      )}
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

export default withStyles(styles)(MainToolbar)
