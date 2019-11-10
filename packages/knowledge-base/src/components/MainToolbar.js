import React, { useContext, useState } from 'react'
import { useStaticQuery, graphql, navigate, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Typography, Button, withStyles } from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import classnames from 'classnames'
import { Auth } from 'aws-amplify'
import { AuthContext, NavLink, PaddedContainer } from 'components'

import SecondaryNavigation from './SecondaryNavigation'
import MobileSidebar from './MobileSidebar'

function MainToolbar({ classes, dark, ...props }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const { getUserTokenData } = useContext(AuthContext)

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

  const toggleSidebar = open => () => {
    setShowSidebar(open)
  }

  const doLogout = () => {
    Auth.signOut()
    navigate('/auth')
  }

  const { userId, isAdmin, isAuthenticated } = getUserTokenData()

  const darkClass = classnames({
    [classes.toolbarDark]: dark,
    [classes.toolbarContrast]: dark,
    [classes.toolbarLightContrast]: !dark,
  })

  const navButtonClass = classnames(classes.navButton, darkClass)

  // darkClass is needed on both outer container and inner padded container
  // to avoid hairline gap between toolbar and main element in mobile WebKit

  const gradient = <div className={classes.gradient} />

  return (
    <>
      <MobileSidebar
        open={showSidebar}
        closeSidebar={toggleSidebar(false)}
        gradient={gradient}
      />
      <div id="main-toolbar" className={darkClass} data-testid="main-toolbar">
        {gradient}
        <PaddedContainer className={darkClass}>
          <div className={classes.root}>
            <Button
              className={classnames(classes.menuButton, {
                [classes.menuButtonDark]: dark,
                [classes.menuButtonLight]: !dark,
              })}
              onClick={toggleSidebar(true)}
            >
              MENU
            </Button>
            <Link
              to="/"
              className={classnames(classes.logoHomeLink, darkClass)}
              data-testid="main-toolbar__logo"
            >
              <Img className={classes.logo} fixed={fixed} />
              <Typography variant="h2" className={classes.logotype}>
                {title}
              </Typography>
            </Link>
            <div className={classes.grow} />
            <div
              className={classes.linksContainer}
              data-testid="main-toolbar__links-container"
            >
              <Button
                partial={false}
                className={navButtonClass}
                component={NavLink}
                to="/"
              >
                KNOWLEDGE BASE
              </Button>
              <Button
                className={navButtonClass}
                component={NavLink}
                to="https://www.efqm.org/"
              >
                EFQM.ORG
              </Button>
              {isAuthenticated && (
                <Button
                  className={navButtonClass}
                  component={NavLink}
                  to={userId ? `/profile/${userId}` : '#'}
                >
                  <AccountCircleOutlinedIcon
                    className={classes.icon}
                    fontSize="large"
                  />
                  MyEFQM
                </Button>
              )}
              {!isAuthenticated && (
                <Button
                  className={navButtonClass}
                  component={NavLink}
                  data-testid="login-button"
                  to="/auth"
                >
                  LOGIN
                </Button>
              )}
              {isAdmin && (
                <Button
                  className={navButtonClass}
                  component={NavLink}
                  to="/admin"
                >
                  ADMIN
                </Button>
              )}
              {isAuthenticated && (
                <Button className={navButtonClass} onClick={doLogout}>
                  LOGOUT
                </Button>
              )}
            </div>
          </div>
          <div className={classes.secondaryNavigation}>
            <SecondaryNavigation dark={dark} />
          </div>
        </PaddedContainer>
      </div>
    </>
  )
}

const styles = theme => ({
  gradient: {
    height: 8,
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 32%, ${theme.palette.primary.light} 56%, ${theme.palette.secondary.main} 80%, ${theme.palette.secondary.dark})`,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    '@media (max-width: 800px)': {
      paddingTop: theme.spacing(1.5),
    },
  },
  menuButton: {
    display: 'none',
    top: theme.spacing(-0.5),
    fontWeight: 'normal',
    width: '79px',
    height: '32px',
    borderRadius: '4px',
    border: 'solid 1px',
    '@media (max-width: 800px)': {
      display: 'block',
      marginBottom: theme.spacing(1),
    },
  },
  menuButtonLight: {
    color: theme.palette.secondary.main,
  },
  menuButtonDark: {
    color: theme.palette.background.paper,
  },
  logoHomeLink: {
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 800px)': {
      display: 'block',
      paddingRight: 'calc(79px/2)',
      marginBottom: theme.spacing(1),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  logotype: {
    fontWeight: 900,
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  toolbarDark: {
    backgroundColor: theme.palette.primary.main,
  },
  toolbarLightContrast: {
    color: theme.palette.primary.dark,
  },
  toolbarContrast: {
    color: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  navButton: {
    fontWeight: 'normal',
    minHeight: '48px',
    textTransform: 'none',
  },
  icon: {
    color: 'inherit',
    marginRight: theme.spacing(1),
    opacity: 0.6,
  },
  linksContainer: {
    display: 'flex',
    marginRight: `-${theme.spacing(1)}px`,
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  secondaryNavigation: {
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
})

export default withStyles(styles)(MainToolbar)
