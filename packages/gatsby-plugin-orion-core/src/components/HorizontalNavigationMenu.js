import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { loadCSS } from 'fg-loadcss'
import clsx from 'clsx'
import { Link } from '@reach/router'
import { Button, Menu, MenuItem, Icon } from '@material-ui/core'
import NestedMenuItem from 'material-ui-nested-menu-item'

// Renders either a MenuItem or NestedMenuItem depending if the current item has children
const ChildItem = ({
  item,
  parentOpen,
  childIndicatorIcon,
  classes,
  userRole,
}) => {
  const hasChildren = item.children !== undefined && item.children.length > 0

  const itemContent = (
    <>
      {item.leftIconClass && (
        <Icon
          fontSize="inherit"
          className={clsx(
            item.leftIconClass,
            'horizontal-navigation-menu-label-icon'
          )}
        />
      )}
      {item.label}
      {item.rightIconClass && (
        <Icon
          fontSize="inherit"
          className={clsx(
            item.rightIconClass,
            'horizontal-navigation-menu-label-icon'
          )}
        />
      )}
    </>
  )

  const to = item.to === undefined ? '#' : item.to

  return hasChildren ? (
    <NestedMenuItem
      // NestedMenuItem accepts a component property, but for now it is not used
      // Instead we render everything in the label
      label={
        <Link to={to}>
          {itemContent}
          <Icon
            fontSize="inherit"
            className={clsx(
              childIndicatorIcon,
              'horizontal-navigation-menu-indicator-icon'
            )}
          />
        </Link>
      }
      parentMenuOpen={parentOpen}
      rightIcon={null}
    >
      {item.children.filter(authorizedForUserRole(userRole)).map(child => (
        <ChildItem
          key={`${child.label}-${child.to}`}
          item={child}
          parentOpen={parentOpen}
          classes={classes}
          childIndicatorIcon={childIndicatorIcon}
          userRole={userRole}
        />
      ))}
    </NestedMenuItem>
  ) : (
    <MenuItem component={Link} to={to}>
      {itemContent}
    </MenuItem>
  )
}

// Renders a root menu item, wrapped in a button
const RootItem = ({
  item,
  childIndicatorIcon,
  dropDownIndicatorIcon,
  classes,
  userRole,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const hasChildren = item.children !== undefined && item.children.length > 0

  const childItems = hasChildren ? (
    // Wrap any children in a Menu
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      anchorOrigin={{ vertical: 'bottom' }}
      onClose={() => setAnchorEl(null)}
    >
      {item.children.filter(authorizedForUserRole(userRole)).map(child => (
        <ChildItem
          key={`${child.label}-${child.to}`}
          parentOpen={Boolean(anchorEl)}
          item={child}
          childIndicatorIcon={childIndicatorIcon}
          classes={classes}
          userRole={userRole}
        />
      ))}
    </Menu>
  ) : null

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        component={hasChildren ? 'button' : Link}
        to={hasChildren ? undefined : item.to}
        onClick={hasChildren ? e => setAnchorEl(e.currentTarget) : undefined}
      >
        {item.leftIconClass && (
          <Icon
            fontSize="inherit"
            className={clsx(
              item.leftIconClass,
              'horizontal-navigation-menu-label-icon'
            )}
          />
        )}
        {item.label}
        {item.rightIconClass && (
          <Icon
            fontSize="inherit"
            className={clsx(
              item.rightIconClass,
              'horizontal-navigation-menu-label-icon'
            )}
          />
        )}
        {hasChildren && (
          <Icon
            fontSize="inherit"
            className={clsx(
              dropDownIndicatorIcon,
              'horizontal-navigation-menu-indicator-icon'
            )}
          />
        )}
      </Button>
      {childItems}
    </>
  )
}

function authorizedForUserRole(userRole) {
  return authorized
  function authorized(item) {
    if (item.authRole === undefined) {
      return true
    }

    if (item.authRole === userRole) {
      return true
    }

    return false
  }
}

const HorizontalNavigationMenu = ({
  data,
  dropDownIndicatorIcon = 'fas fa-chevron-down',
  childIndicatorIcon = 'fas fa-chevron-right',
  userRole,
  classes,
}) => {
  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.1/css/all.css',
      document.querySelector('#font-awesome-css')
    )
  }, [])

  return data
    .filter(authorizedForUserRole(userRole))
    .map(item => (
      <RootItem
        key={`${item.label}-${item.to}`}
        item={item}
        childIndicatorIcon={childIndicatorIcon}
        dropDownIndicatorIcon={dropDownIndicatorIcon}
        classes={classes}
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
  childIndicatorIcon: PropTypes.string,
}

export default HorizontalNavigationMenu
