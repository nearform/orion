import React from 'react'
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core'
import { Link as RouterLink } from '@reach/router'

import { isAdmin } from '../utils/auth'

function MainToolbar({ classes }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.grow} />
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        {isAdmin() && (
          <Button color="inherit" component={RouterLink} to="/admin">
            Admin
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

const styles = {
  grow: {
    flexGrow: 1,
  },
}

export default withStyles(styles)(MainToolbar)
