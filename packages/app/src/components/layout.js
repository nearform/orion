import React from 'react'
import { withStyles } from '@material-ui/core'
import Footer from './Footer'

import MainToolbar from './MainToolbar'

function Layout({ classes, children }) {
  return (
    <div className={classes.root}>
      <header>
        <MainToolbar />
      </header>
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  )
}

const styles = theme => ({
  main: {
    padding: theme.spacing.unit,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default withStyles(styles)(Layout)
