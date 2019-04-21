import React from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import { Typography, Button, withStyles } from '@material-ui/core'
import { Auth } from 'aws-amplify'

import { useIsAdmin, useIsAuthenticated } from '../utils/auth'
import NavLink from './NavLink'

function MainToolbar({ classes }) {
  const {
    site: {
      siteMetadata: { title },
    },
    file: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      file(name: { eq: "logo" }) {
        childImageSharp {
          fixed(height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const doLogout = () => {
    Auth.signOut()
    navigate('/auth')
  }

  const isAdmin = useIsAdmin()
  const isAuthenticated = useIsAuthenticated()

  return (
    <>
      <div className={classes.gradient} />
      <div className={classes.root}>
        <Img className={classes.logo} fixed={fixed} />
        <Typography variant="h5">{title}</Typography>
        <div className={classes.grow} />
        <div className={classes.linksContainer}>
          <Button partial={false} component={NavLink} to="/">
            Home
          </Button>
          {!isAuthenticated && (
            <Button component={NavLink} to="/auth">
              Login
            </Button>
          )}
          {isAdmin && (
            <Button component={NavLink} to="/admin">
              Admin
            </Button>
          )}
          {isAuthenticated && <Button onClick={doLogout}>Logout</Button>}
        </div>
      </div>
    </>
  )
}

const styles = theme => ({
  gradient: {
    height: 8,
    backgroundImage: `linear-gradient(to right, ${
      theme.palette.primary.dark
    }, ${theme.palette.primary.main} 32%, ${theme.palette.primary.light} 56%, ${
      theme.palette.secondary.main
    } 80%, ${theme.palette.secondary.dark})`,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
  },
  logo: {
    marginRight: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  linksContainer: {
    '& > * + *': {
      marginLeft: theme.spacing.unit * 4,
    },
  },
})

export default withStyles(styles)(MainToolbar)
