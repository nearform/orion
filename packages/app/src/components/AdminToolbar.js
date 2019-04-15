import React from 'react'
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core'
import { Link as RouterLink } from '@reach/router'

function AdminToolbar({ classes, ...props }) {
  return (
    <AppBar position="relative" color="default" {...props}>
      <Toolbar>
        <div className={classes.grow} />
        <Button color="inherit" component={RouterLink} to="pending-users">
          Pending users
        </Button>
        <Button color="inherit" component={RouterLink} to="groups">
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
