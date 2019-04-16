import React from 'react'
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core'

import NavLink from './NavLink'

function AdminToolbar({ classes, ...props }) {
  return (
    <AppBar position="relative" color="default" {...props}>
      <Toolbar>
        <div className={classes.grow} />
        <Button color="inherit" component={NavLink} to="pending-users">
          Pending users
        </Button>
        <Button color="inherit" component={NavLink} to="groups">
          Groups
        </Button>
      </Toolbar>
    </AppBar>
  )
}

const styles = {
  grow: {
    flexGrow: 1,
  },
}

export default withStyles(styles)(AdminToolbar)
