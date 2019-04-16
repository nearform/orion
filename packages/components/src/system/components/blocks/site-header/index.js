import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core'

import Logo from '../../elements/logo'

const SiteHeader = ({ classes, linkComponent, isAdmin }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Logo />
        <div className={classes.grow} />
        <Button color="inherit" component={linkComponent} to="/">
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
  isAdmin: () => true,
}

SiteHeader.propTypes = {
  classes: PropTypes.object,
  isAdmin: PropTypes.func,
  linkComponent: PropTypes.element,
}

export default withStyles(styles)(SiteHeader)
