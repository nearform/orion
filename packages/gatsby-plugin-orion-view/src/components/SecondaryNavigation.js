import React, { useContext, useEffect, useState } from 'react'
import { navigate } from '@reach/router' // eslint-disable-line import/no-extraneous-dependencies
import Close from '@material-ui/icons/Close'
import {
  Grid,
  withStyles,
  Input,
  InputAdornment,
  IconButton,
  ClickAwayListener,
} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import SearchIcon from '@material-ui/icons/Search'
import { AuthContext } from 'components'
import useTaxonomies from 'gatsby-plugin-orion-core/hooks/useTaxonomies'
import usePrevious from 'gatsby-plugin-orion-core/hooks/usePrevious'
import QuickLinksMenu, {
  QuickLinksMenuItem,
  QuickLinkButton,
} from './QuickLinksMenu'

const ENTER_KEY = 13
const WAIT_INTERVAL = 1000

function SecondaryNavigation({ classes, dark, theme }) {
  const { getUserTokenData } = useContext(AuthContext)
  const { isAuthenticated } = getUserTokenData()
  const [search, setSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const prevSearchText = usePrevious(searchText)
  const taxonomyTypes = useTaxonomies()
  let typingTimeout = null

  useEffect(() => {
    if (searchText && searchText !== prevSearchText) {
      // Not a problem that the value of typingTimeout is lost on unmount etc
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleCloseSearch = () => {
    setSearch(false)
    setSearchText('')
  }

  const searchButtonClasses = `${classes.searchButton} ${!isAuthenticated &&
    classes.lastButton}`

  return search ? (
    <Grid
      container
      id="secondary-navigation"
      justify="flex-end"
      spacing={3}
      className={classes.inputContainer}
    >
      <ClickAwayListener onClickAway={() => setSearch(false)}>
        <Grid item>
          <Input
            autoFocus
            placeholder="Search The Knowledge Base"
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
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </Grid>
      </ClickAwayListener>
    </Grid>
  ) : (
    <Grid container id="secondary-navigation" justify="flex-end" spacing={3}>
      {taxonomyTypes.map((type, index) => (
        <Grid key={`tax_type_${type.key}`} item>
          <QuickLinksMenu dark={dark} label={type.name}>
            {type.taxonomy_items.map(item => (
              <QuickLinksMenuItem
                key={`quick_link_${item.key}`}
                borderColor={theme.taxonomyColor[`C${index + 1}`]}
                onClick={() => navigate('/section/' + item.key)}
              >
                {item.name}
              </QuickLinksMenuItem>
            ))}
          </QuickLinksMenu>
        </Grid>
      ))}
      <Grid item className={searchButtonClasses}>
        <QuickLinkButton dark={dark} onClick={() => setSearch(!search)}>
          <Icon component={SearchIcon} color="secondary" />
          Search
        </QuickLinkButton>
      </Grid>
      {isAuthenticated && (
        <Grid
          item
          className={`${classes.myContentButton} ${classes.lastButton}`}
        >
          <QuickLinkButton dark={dark} onClick={() => navigate('/my-content')}>
            My Content
          </QuickLinkButton>
        </Grid>
      )}
    </Grid>
  )
}

const styles = theme => ({
  inputContainer: {
    paddingBottom: '12px',
  },
  inputCloseIcon: {
    fontSize: 16, // Tiny icon size, overriding MUI defaults
  },
  inputClass: {
    padding: `0px  ${theme.spacing(1)}px`,
    borderRadius: '3px',
    margin: '2px 0px 4px 0px', // Vertical aligment so glitching when showing search bar is minimal, not neccesarry if we implment a nice transition animation
    '&>input': {
      color: theme.palette.primary.dark,
      minWidth: '280px',
      padding: `4px ${theme.spacing(2)}px 6px ${theme.spacing(2)}px`, // The top and bottom padding are alignment related, and text size dependant
      lineHeight: '20px', // Input box height, overriding MUI defaults
      height: '20px', // Input box height, overriding MUI defaults
      '&::-webkit-input-placeholder': {
        ...theme.typography.h3,
        lineHeight: '20px',
      },
      '&::-moz-placeholder': { ...theme.typography.h3, lineHeight: '20px' },
      '&:-ms-input-placeholder': { ...theme.typography.h3, lineHeight: '20px' },
    },
  },
  // Fixes the last button looking misaligned because it's transparent and padded with
  // a hover colour
  lastButton: {
    '& button': {
      marginRight: `-${theme.spacing(1)}px`,
    },
  },
  myContentButton: {
    display: 'flex',
  },
  searchButton: {
    display: 'flex',
  },
})

export default withStyles(styles, { withTheme: true })(SecondaryNavigation)
