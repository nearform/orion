import React from 'react'
import T from 'prop-types'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles,
} from '@material-ui/core'

import NavLink from './NavLink'

function AdminToolbar({ classes, pageTitle, ...props }) {
  return (
    <AppBar
      position="relative"
      color="inherit"
      className={classes.root}
      elevation={0}
    >
      <Toolbar disableGutters>
        <Typography variant="h1">{pageTitle}</Typography>
        <div className={classes.grow} />
        <div className={classes.linksContainer}>
          <Button
            color="inherit"
            component={NavLink}
            className={classes.navLink}
            to="pending-users"
          >
            Pending users
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            className={classes.navLink}
            to="all-users"
          >
            All Users
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            className={classes.navLink}
            to="groups"
          >
            Groups
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  linksContainer: {
    '& > * + *': {
      marginLeft: theme.spacing(4),
    },
  },
  navLink: {
    color: theme.palette.primary.dark,
    fontWeight: 700,
  },
})

AdminToolbar.propTypes = {
  pageTitle: T.string,
  classes: T.object,
}

export default withStyles(styles)(AdminToolbar)
