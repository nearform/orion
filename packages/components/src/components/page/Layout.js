import React from 'react'
import T from 'prop-types'
import { withStyles } from '@material-ui/core'

function Layout({ classes, children, darkToolbar, AppFooter, MainToolbar }) {
  return (
    <div className={classes.root}>
      <header>
        <MainToolbar dark={darkToolbar} />
      </header>
      <main className={classes.main}>{children}</main>
      <footer>
        <AppFooter />
      </footer>
    </div>
  )
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    maxWidth: 1440,
    minHeight: '100vh',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginBottom: theme.spacing(4),
  },
})

Layout.propTypes = {
  classes: T.object,
  children: T.node,
  darkToolbar: T.bool,
  AppFooter: T.elementType,
  MainToolbar: T.elementType,
}

export default withStyles(styles)(Layout)
