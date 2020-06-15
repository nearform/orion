import React, { useState } from 'react'
import {
  Button,
  Menu,
  Icon,
  ClickAwayListener,
  makeStyles,
} from '@material-ui/core'
import ChildItem from './ChildItem'
import { Link } from '@reach/router'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles(theme => ({
  item: {
    '& a, & button, & svg': {
      color: theme.palette.common.white,
    },
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
  },
}))

// Renders a root menu item, wrapped in a button

const RootItem = ({ item, userRole }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
  const hasChildren = item.children !== undefined && item.children.length > 0

  const childItems = hasChildren ? (
    // Wrap any children in a Menu
    <Menu
      anchorEl={anchorEl}
      classes={{ paper: classes.menu }}
      open={Boolean(anchorEl)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      getContentAnchorEl={null}
      onClose={() => setAnchorEl(null)}
    >
      {item.children.filter(isAuthorizedForUserRole(userRole)).map(child => (
        <ChildItem
          key={`${child.label}-${child.to}`}
          classes={classes}
          parentOpen={Boolean(anchorEl)}
          item={child}
          userRole={userRole}
        />
      ))}
    </Menu>
  ) : null

  return (
    <>
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          component={hasChildren ? 'button' : Link}
          to={hasChildren ? undefined : item.to}
          onClick={hasChildren ? e => setAnchorEl(e.currentTarget) : undefined}
        >
          {item.leftIconClass && (
            <Icon fontSize="inherit" className={item.leftIconClass} />
          )}
          {item.label}
          {item.rightIconClass && (
            <Icon fontSize="inherit" className={item.rightIconClass} />
          )}
          {hasChildren && <ArrowDropDown />}
        </Button>
      </ClickAwayListener>
      {childItems}
    </>
  )
}

function isAuthorizedForUserRole(userRole) {
  return item => {
    if (item.authRole === undefined) {
      return true
    }

    if (item.authRole === userRole) {
      return true
    }

    return false
  }
}

export default RootItem
