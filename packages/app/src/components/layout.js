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
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    padding: theme.spacing.unit,
  },
})

export default withStyles(styles)(Layout)
