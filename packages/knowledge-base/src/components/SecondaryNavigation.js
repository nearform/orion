import React, { useState } from 'react'
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
const SubmitButton = withStyles(theme => ({
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
SubmitButton.defaultProps = {
  variant: 'outlined',
  color: 'secondary',
}

function SecondaryNavigation({ classes, dark }) {
  const [search, setSearch] = useState(false)

  return !search ? (
    <Grid container justify="flex-end" spacing={3}>
      <Grid item>
        <QuickLinksMenu dark={dark} label={'Topics'}>
          <QuickLinksMenuItem>Test 1</QuickLinksMenuItem>
          <QuickLinksMenuItem>Test 2</QuickLinksMenuItem>
          <QuickLinksMenuItem>Test Longer</QuickLinksMenuItem>
        </QuickLinksMenu>
      </Grid>
      <Grid item>
        <QuickLinksMenu dark={dark} label={'Categories'}>
          <QuickLinksMenuItem>Test 1</QuickLinksMenuItem>
          <QuickLinksMenuItem>Test 2</QuickLinksMenuItem>
          <QuickLinksMenuItem>Test Longer</QuickLinksMenuItem>
        </QuickLinksMenu>
      </Grid>
      <Grid item>
        <QuickLinksMenu dark={dark} label={'Sectors'}>
          <QuickLinksMenuItem>Test 1</QuickLinksMenuItem>
          <QuickLinksMenuItem>Test 2</QuickLinksMenuItem>
          <QuickLinksMenuItem>Test Longer</QuickLinksMenuItem>
        </QuickLinksMenu>
      </Grid>
      <Grid item>
        <QuickLinkButton dark={dark} onClick={() => setSearch(!search)}>
          <Icon component={SearchIcon} color="secondary" />
          Search
        </QuickLinkButton>
      </Grid>
      <Grid item>
        <SubmitButton component={NavLink} to="/submit">
          Submit
        </SubmitButton>
      </Grid>
    </Grid>
  ) : (
    <>
      <Grid container justify="flex-end" spacing={3}>
        <ClickAwayListener onClickAway={() => setSearch(false)}>
          <Grid item>
            <Input
              autoFocus
              placeholder="Search The Knowledge Base"
              className={classes.inputClass}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    aria-label="Close search"
                    onClick={() => setSearch(false)}
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
