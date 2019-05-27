import React from 'react'
import { withStyles } from '@material-ui/core'

import Footer from './Footer'
import MainToolbar from './MainToolbar'

function Layout({ classes, children, darkToolbar }) {
  return (
    <div className={classes.root}>
      <header>
        <MainToolbar dark={darkToolbar} />
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
    margin: '0 auto',
    maxWidth: 1440,
    minHeight: '100vh',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginBottom: theme.spacing.unit * 4,
  },
})

export default withStyles(styles)(Layout)
