import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import Close from '@material-ui/icons/Close'
import {
  Grid,
  Button,
  withStyles,
  Input,
  InputAdornment,
  IconButton,
  ClickAwayListener,
} from '@material-ui/core'
import NavLink from './NavLink'
import Icon from '@material-ui/core/Icon'
import SearchIcon from '@material-ui/icons/Search'
import QuickLinksMenu, {
  QuickLinksMenuItem,
  QuickLinkButton,
} from './QuickLinksMenu'
import { useIsAuthenticated } from '../utils/auth'
import useTaxonomies from '../hooks/useTaxonomies'
import usePrevious from '../hooks/usePrevious'

const MyContentButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: '2px', //for alignment purposes to avoid flexboxing, depending on the difference between regular button and the quicklink menu button
    marginLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    '&::after': {
      content: 'none',
    },
  },
}))(Button)
MyContentButton.defaultProps = {
  variant: 'outlined',
  color: 'secondary',
  component: NavLink,
  to: '/my-content',
  children: 'My Content',
}

const ENTER_KEY = 13
const WAIT_INTERVAL = 1000

function SecondaryNavigation({ classes, dark }) {
  const [search, setSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const prevSearchText = usePrevious(searchText)
  const isAuthenticated = useIsAuthenticated()
  const taxonomyTypes = useTaxonomies()
  let typingTimeout = null

  useEffect(() => {
    if (searchText && searchText !== prevSearchText) {
      typingTimeout = setTimeout(
        () => navigate('/search/' + searchText),
        WAIT_INTERVAL
      )
    }
  })

  const handleChange = e => {
    clearTimeout(typingTimeout)
    setSearchText(e.target.value)
  }
  const handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      navigate('/search/' + searchText)
    }
  }
  const handleCloseSearch = e => {
    setSearch(false)
    setSearchText('')
  }

  return !search ? (
    <Grid container justify="flex-end" spacing={3}>
      {taxonomyTypes.map(type => (
        <Grid item key={`tax_type_${type.key}`}>
          <QuickLinksMenu dark={dark} label={type.name}>
            {type.taxonomy_items.map(item => (
              <QuickLinksMenuItem
                key={`quick_link_${item.key}`}
                onClick={() => navigate('/section/' + item.key)}
              >
                {item.name}
              </QuickLinksMenuItem>
            ))}
          </QuickLinksMenu>
        </Grid>
      ))}
      <Grid item>
        <QuickLinkButton dark={dark} onClick={() => setSearch(!search)}>
          <Icon component={SearchIcon} color="secondary" />
          Search
        </QuickLinkButton>
      </Grid>
      <Grid item>{isAuthenticated && <MyContentButton />}</Grid>
    </Grid>
  ) : (
    <>
      <Grid container justify="flex-end" spacing={3}>
        <ClickAwayListener onClickAway={() => setSearch(false)}>
          <Grid item>
            <Input
              autoFocus
              placeholder="Search The Knowledge Base"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={classes.inputClass}
              value={searchText}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    aria-label="Close search"
                    onClick={handleCloseSearch}
                  >
                    <Close className={classes.inputCloseIcon} />
                  </IconButton>
                </InputAdornment>
              }
              startAdornment={<Icon component={SearchIcon} color="secondary" />}
            />
          </Grid>
        </ClickAwayListener>
      </Grid>
    </>
  )
}
const styles = theme => ({
  inputCloseIcon: {
    fontSize: 16, //tiny icon size, overriding MUI defaults
  },
  inputClass: {
    padding: `0px  ${theme.spacing(1)}px`,
    borderRadius: '3px',
    margin: '2px 0px 4px 0px', //vertical aligment so glitching when showing search bar is minimal, not neccesarry if we implment a nice transition animation
    '&>input': {
      color: theme.palette.primary.dark,
      minWidth: '280px',
      padding: `4px ${theme.spacing(2)}px 6px ${theme.spacing(2)}px`, //the top and bottom padding are alignment related, and text size dependant
      lineHeight: '20px', //input box height, overriding MUI defaults
      height: '20px', //input box height, overriding MUI defaults
      '&::-webkit-input-placeholder': { ...theme.typography.h3 },
      '&::-moz-placeholder': { ...theme.typography.h3 },
      '&:-ms-input-placeholder': { ...theme.typography.h3 },
    },
  },
})

export default withStyles(styles)(SecondaryNavigation)
