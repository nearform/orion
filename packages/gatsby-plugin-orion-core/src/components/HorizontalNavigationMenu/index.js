import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import {
  Button,
  Menu,
  Icon,
  ClickAwayListener,
  makeStyles,
} from '@material-ui/core'
import NestedMenuItem from '../NestedMenuItem'
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

const HorizontalNavigationMenu = ({ data, userRole }) => {
  return data
    .filter(isAuthorizedForUserRole(userRole))
    .map(item => (
      <RootItem
        key={`${item.label}-${item.to}`}
        item={item}
        userRole={userRole}
      />
    ))
}

// There is a circular dependency: children can have children
// Define PropTypes OTHER than children
const menuItemShape = {
  label: PropTypes.string,
  to: PropTypes.string,
  leftIconClass: PropTypes.string,
  rightIconClass: PropTypes.string,
  authRole: PropTypes.string,
}
const menuItemNode = PropTypes.shape(menuItemShape)

// Create the circular child PropType
menuItemShape.children = PropTypes.arrayOf(menuItemNode)

HorizontalNavigationMenu.propTypes = {
  data: PropTypes.arrayOf(menuItemNode).isRequired,
}

export default HorizontalNavigationMenu

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
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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

// Renders a NestedMenuItem
//
// We have to forward the ref recursively to children
// see: https://material-ui.com/guides/composition/#caveat-with-refs
// and https://github.com/mui-org/material-ui/issues/15903
const ChildItem = forwardRef(({ classes, item, parentOpen, userRole }, ref) => {
  const itemContent = (
    <>
      {item.leftIconClass && (
        <Icon fontSize="inherit" className={item.leftIconClass} />
      )}
      {item.label}
      {item.rightIconClass && (
        <Icon fontSize="inherit" className={item.rightIconClass} />
      )}
    </>
  )

  const to = item.to === undefined ? '#' : item.to

  return (
    <NestedMenuItem
      // NestedMenuItem accepts a component property, but for now it is not used
      // Instead we render everything in the label
      label={<Link to={to}>{itemContent}</Link>}
      className={classes.item}
      MenuProps={{
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        classes: { paper: classes.menu },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      }}
      parentMenuOpen={parentOpen}
    >
      {item.children !== undefined &&
        item.children.filter(isAuthorizedForUserRole(userRole)).map(child => (
          <ChildItem
            key={`${child.label}-${child.to}`}
            ref={ref}
            // Forward the ref down to all children on intermediate nodes
            classes={classes}
            item={child}
            parentOpen={parentOpen}
            userRole={userRole}
          />
        ))}
    </NestedMenuItem>
  )
})

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
