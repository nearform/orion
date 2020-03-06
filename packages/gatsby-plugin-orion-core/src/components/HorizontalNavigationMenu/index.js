import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { loadCSS } from 'fg-loadcss'
import clsx from 'clsx'
import { Link } from '@reach/router'
import {
  Button,
  Menu,
  MenuItem,
  Icon,
  ClickAwayListener,
} from '@material-ui/core'
import NestedMenuItem from '../NestedMenuItem'

const auto = {
  style: {
    height: 'auto',
  },
}

const HorizontalNavigationMenu = ({
  classes,
  data,
  dropDownIndicatorIcon = 'fas fa-chevron-down',
  childIndicatorIcon = 'fas fa-chevron-right',
  userRole,
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
        classes={classes}
        item={item}
        childIndicatorIcon={childIndicatorIcon}
        dropDownIndicatorIcon={dropDownIndicatorIcon}
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
  classes: PropTypes.object,
  data: PropTypes.arrayOf(menuItemNode).isRequired,
  childIndicatorIcon: PropTypes.string,
}

const styles = theme => ({ ...theme.horizontalMenu })

export default withStyles(styles, { withTheme: true })(HorizontalNavigationMenu)

// Renders a root menu item, wrapped in a button
const RootItem = ({
  classes,
  item,
  childIndicatorIcon,
  dropDownIndicatorIcon,
  userRole,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const hasChildren = item.children !== undefined && item.children.length > 0

  const childItems = hasChildren ? (
    // Wrap any children in a Menu
    <Menu
      anchorEl={anchorEl}
      className={classes.popover}
      open={Boolean(anchorEl)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      getContentAnchorEl={null}
      PaperProps={{
        style: {
          height: 'auto',
        },
      }}
      onClose={() => setAnchorEl(null)}
    >
      {item.children.filter(authorizedForUserRole(userRole)).map(child => (
        <ChildItem
          key={`${child.label}-${child.to}`}
          parentOpen={Boolean(anchorEl)}
          item={child}
          childIndicatorIcon={childIndicatorIcon}
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
      </ClickAwayListener>
      {childItems}
    </>
  )
}

// Renders either a MenuItem or NestedMenuItem depending if the current item has children
//
// We have to forward the ref recursively to children
// see: https://material-ui.com/guides/composition/#caveat-with-refs
// and https://github.com/mui-org/material-ui/issues/15903
const ChildItem = forwardRef(
  ({ item, parentOpen, childIndicatorIcon, userRole }, ref) => {
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
        className="nested-menu-item"
        MenuProps={{
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          transformOrigin: { vertical: 'top', horizontal: 'left' },
          anchorPosition: { top: 100 },
          // AnchorReference: 'anchorPosition',
          PaperProps: {
            style: {
              height: 'auto',
            },
          },
        }}
        parentMenuOpen={parentOpen}
        rightIcon={null}
      >
        {item.children.filter(authorizedForUserRole(userRole)).map(child => (
          <ChildItem
            key={`${child.label}-${child.to}`}
            // Forward the ref down to all children on intermediate nodes
            ref={ref}
            item={child}
            parentOpen={parentOpen}
            childIndicatorIcon={childIndicatorIcon}
            userRole={userRole}
          />
        ))}
      </NestedMenuItem>
    ) : (
      <MenuItem
        // The ref needs to be passed to the reach-router Link on leaf nodes
        ref={ref}
        component={Link}
        to={to}
        classes={auto}
      >
        {itemContent}
      </MenuItem>
    )
  }
)

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
