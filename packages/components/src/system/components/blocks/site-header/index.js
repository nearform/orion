import React from 'react'
import T from 'prop-types'
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core'

import Logo from '../../elements/logo'

const SiteHeader = ({ classes, linkComponent, isAdmin }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Logo />
        <div className={classes.grow} />
        <Button
          partial={false}
          color="inherit"
          component={linkComponent}
          to="/"
        >
          Home
        </Button>
        {isAdmin() && (
          <Button color="inherit" component={linkComponent} to="/admin">
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

SiteHeader.defaultProps = {
  isAdmin: () => false,
}

SiteHeader.propTypes = {
  classes: T.object.isRequired,
  isAdmin: T.func,
  linkComponent: T.elementType,
}

export default withStyles(styles)(SiteHeader)
