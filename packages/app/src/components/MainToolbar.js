import React from 'react'
import { useStaticQuery, graphql, navigate, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Typography, Button, withStyles } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import { PaddedContainer } from 'components'

import { useIsAdmin, useIsAuthenticated } from '../utils/auth'
import NavLink from './NavLink'
import LanguageSwitcher from './LanguageSwitcher'

function MainToolbar({ classes }) {
  const {
    site: {
      siteMetadata: { title },
    },
    logo: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      logo: file(name: { eq: "logo" }) {
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
      <PaddedContainer>
        <div className={classes.root}>
          <Link to="/" className={classes.logoHomeLink}>
            <Img className={classes.logo} fixed={fixed} />
            <Typography variant="h2">{title}</Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.linksContainer}>
            <Button component={NavLink} to="/assess">
              Assess Base
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
            <LanguageSwitcher />
          </div>
        </div>
      </PaddedContainer>
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
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 4,
  },
  logoHomeLink: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  linksContainer: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing.unit * 4,
    },
  },
})

export default withStyles(styles)(MainToolbar)
