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

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}

export default withStyles(styles)(Layout)
