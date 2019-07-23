import React from 'react'
import T from 'prop-types'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles,
} from '@material-ui/core'

import NavLink from '../NavLink'
import { useIsPlatformGroup } from '../../utils/auth'

function ContentToolbar({ classes, pageTitle }) {
  const isPlatformGroup = useIsPlatformGroup()
  return (
    <AppBar
      position="relative"
      color="inherit"
      className={classes.root}
      elevation={0}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        <Typography variant="h1">{pageTitle}</Typography>
        <Button
          variant="contained"
          color="secondary"
          component={NavLink}
          to="/my-content/add"
          className={classes.newButton}
        >
          Create New
        </Button>
        <div className={classes.linksContainer}>
          <Button
            color="inherit"
            component={NavLink}
            className={classes.navLink}
            to="all-stories"
          >
            All Stories
          </Button>
          {isPlatformGroup && (
            <>
              <Button
                color="inherit"
                component={NavLink}
                className={classes.navLink}
                to="needs-review"
              >
                Needs Review
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                className={classes.navLink}
                to="editors-picks"
              >
                Editors Picks
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                className={classes.navLink}
                to="tag-manager"
              >
                Tag Manager
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

const styles = theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  toolbar: {
    alignItems: 'flex-start',
  },
  newButton: {
    marginLeft: '22px',
  },
  linksContainer: {
    marginLeft: 'auto',
    '& > * + *': {
      marginLeft: theme.spacing(4),
    },
  },
  navLink: {
    color: theme.palette.primary.dark,
    fontSize: '14px',
    lineHeight: '17px',
    fontWeight: 400,
    letterSpacing: 'normal',
  },
})

ContentToolbar.propTypes = {
  pageTitle: T.string,
  classes: T.object,
}

export default withStyles(styles)(ContentToolbar)
