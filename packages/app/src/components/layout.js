import React from 'react'
import { Link } from 'gatsby'
import { Typography } from '@material-ui/core'

import MainToolbar from './MainToolbar'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <Typography variant="h1">
          <Link to={`/`}> {title} </Link>
        </Typography>
      )
    } else {
      header = (
        <Typography variant="h3">
          <Link to={'/'}>{title}</Link>
        </Typography>
      )
    }
    return (
      <div>
        <MainToolbar />
        <div>
          <header>{header}</header>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    )
  }
}

export default Layout
