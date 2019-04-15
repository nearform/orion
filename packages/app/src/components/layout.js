import React from 'react'
import { withStyles } from '@material-ui/core'

import MainToolbar from './MainToolbar'

function Layout({ classes, children }) {
  return (
    <div className={classes.root}>
      <header>
        <MainToolbar />
      </header>
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        © {new Date().getFullYear()}, Built by NearForm with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

const styles = theme => ({
  main: {
    padding: theme.spacing.unit,
  },
  footer: {
    padding: theme.spacing.unit,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default withStyles(styles)(Layout)
