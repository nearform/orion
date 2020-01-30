import React, { useContext, useState } from 'react'
import { useStaticQuery, graphql, navigate, Link } from 'gatsby'
import Img from 'gatsby-image'
import T from 'prop-types'
import {
  Button,
  withStyles,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'
import { Auth } from 'aws-amplify'

import { AuthContext, NavLink } from 'components'
import useTaxonomies from '../hooks/useTaxonomies'

const ENTER_KEY = 13

function MobileSidebar({ gradient, classes, closeSidebar, ...props }) {
  const [searchText, setSearchText] = useState('')
  const taxonomyTypes = useTaxonomies()
  const { getUserTokenData } = useContext(AuthContext)

  const {
    logo: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(graphql`
    query {
      logo: file(name: { eq: "logo" }) {
        childImageSharp {
          fixed(height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const handleChange = e => {
    setSearchText(e.target.value)
  }

  const handleSearch = () => {
    if (searchText.length > 0) {
      navigate(`/search/${searchText}`)
      closeSidebar()
    }
  }

  const handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleClearSearch = () => {
    setSearchText('')
  }

  const handleLinkClick = url => () => {
    navigate(url)
    closeSidebar()
  }

  const doLogout = () => {
    Auth.signOut()
    navigate('/auth')
    closeSidebar()
  }

  const { userId, isAuthenticated } = getUserTokenData()

  return (
    <Drawer
      // Classes needs to be done as such in order to fix the width https://stackoverflow.com/a/45650318
      classes={{ paper: classes.paper }}
      onClose={closeSidebar}
      {...props}
      className={classes.root}
    >
      <List className={classes.headerList}>
        {gradient}
        <ListItem>
          <span className={classes.headerHead}>
            <Link to="/" className={classes.logo} onClick={closeSidebar}>
              <Img fixed={fixed} />
            </Link>
            <IconButton className={classes.iconButton} onClick={closeSidebar}>
              <Close className={classes.closeSidebar} />
            </IconButton>
          </span>
        </ListItem>
        <ListItem
          button
          className={classes.listItem}
          onClick={handleLinkClick('/')}
        >
          <Button
            disabled
            partial={false}
            className={classes.headerListLinks}
            component={NavLink}
            to="/"
          >
            KNOWLEDGE BASE
          </Button>
        </ListItem>
        <ListItem
          button
          className={classes.listItem}
          onClick={handleLinkClick('/')}
        >
          <Button
            disabled
            className={classes.headerListLinks}
            component={NavLink}
            to="https://www.efqm.org/"
          >
            EFQM.ORG
          </Button>
        </ListItem>
        {isAuthenticated && (
          <ListItem
            button
            className={classes.listItem}
            onClick={handleLinkClick(userId ? `/profile/${userId}` : '#')}
          >
            <Button
              disabled
              className={classes.headerListLinks}
              component={NavLink}
              to={userId ? `/profile/${userId}` : '#'}
            >
              MyEFQM
            </Button>
          </ListItem>
        )}
        {!isAuthenticated && (
          <ListItem
            button
            className={classes.listItem}
            onClick={handleLinkClick('/auth')}
          >
            <Button
              disabled
              className={classes.headerListLinks}
              component={NavLink}
              to="/auth"
            >
              LOGIN
            </Button>
          </ListItem>
        )}
        {isAuthenticated && (
          <ListItem button className={classes.listItem} onClick={doLogout}>
            <Button disabled className={classes.headerListLinks}>
              LOGOUT
            </Button>
          </ListItem>
        )}
        <ListItem>
          <Input
            autoFocus
            placeholder="Search"
            className={classes.inputClass}
            value={searchText}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="Close search"
                  onClick={handleClearSearch}
                >
                  <Close color="secondary" fontSize="inherit" />
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <IconButton
                className={classes.iconButton}
                aria-label="Search"
                onClick={handleSearch}
              >
                <SearchIcon color="secondary" />
              </IconButton>
            }
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </ListItem>
      </List>
      {taxonomyTypes.map((type, index) => (
        <React.Fragment key={`list_${type.name}`}>
          <ListSubheader className={classes.listSubheader}>
            <ListItemText secondary={type.name} />
          </ListSubheader>
          {type.taxonomy_items.map(item => (
            <ListItem
              key={`list_item_${item.key}`}
              button
              to={`/section/${item.key}`}
              component={Link}
              onClick={closeSidebar}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          {index < taxonomyTypes.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Drawer>
  )
}

MobileSidebar.propTypes = {
  classes: T.object.isRequired,
  className: T.string,
  open: T.bool.isRequired,
  closeSidebar: T.func.isRequired,
  gradient: T.element,
}

const styles = theme => ({
  paper: {
    width: '90%',
  },
  headerHead: {
    width: '100%',
    paddingTop: '0px',
  },
  iconButton: {
    float: 'right',
    padding: '4px',
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  listSubheader: {
    padding: theme.spacing(1, 2),
  },
  listItemText: {
    fontWeight: 900,
    textTransform: 'uppercase',
  },
  closeSidebar: {
    color: theme.palette.primary.contrastText,
  },
  headerList: {
    paddingTop: '0px',
    backgroundColor: theme.palette.primary.dark,
  },
  headerListLinks: {
    // To override the button default class, button is required for the coloured underline of current page
    color: `${theme.palette.primary.contrastText} !important`,
    fontSize: theme.spacing(1.75),
    padding: theme.spacing(1, 0),
    marginLeft: theme.spacing(2),
  },
  inputClass: {
    width: '100%',
    borderRadius: '3px',
    '&>input': {
      color: theme.palette.primary.dark,
      padding: `4px ${theme.spacing(2)}px 6px ${theme.spacing(2)}px`, // The top and bottom padding are alignment related, and text size dependant
      lineHeight: '20px', // Input box height, overriding MUI defaults
      height: '20px', // Input box height, overriding MUI defaults
      '&::-webkit-input-placeholder': {
        ...theme.typography.h3,
        color: theme.palette.primary.dark,
        lineHeight: '20px',
      },
      '&::-moz-placeholder': {
        ...theme.typography.h3,
        color: theme.palette.primary.dark,
        lineHeight: '20px',
      },
      '&:-ms-input-placeholder': {
        ...theme.typography.h3,
        color: theme.palette.primary.dark,
        lineHeight: '20px',
      },
    },
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
    marginTop: theme.spacing(1),
  },
})

export default withStyles(styles)(MobileSidebar)
