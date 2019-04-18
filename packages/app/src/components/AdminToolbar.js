import React from 'react'
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core'

import NavLink from './NavLink'

function AdminToolbar({ classes, ...props }) {
  return (
    <AppBar position="relative" color="default" {...props}>
      <Toolbar>
        <div className={classes.grow} />
        <div className={classes.linksContainer}>
          <Button color="inherit" component={NavLink} to="pending-users">
            Pending users
          </Button>
          <Button color="inherit" component={NavLink} to="all-users">
            All Users
          </Button>
          <Button color="inherit" component={NavLink} to="groups">
            Groups
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  linksContainer: {
    '& > * + *': {
      marginLeft: theme.spacing.unit * 4,
    },
  },
})

export default withStyles(styles)(AdminToolbar)
