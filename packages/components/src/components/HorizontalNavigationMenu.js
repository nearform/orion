import React, { useState, useEffect } from 'react'
import { loadCSS } from 'fg-loadcss'
import clsx from 'clsx'
import { Link } from '@reach/router'
import { Button, Menu, MenuItem, Icon, withStyles } from '@material-ui/core'
import NestedMenuItem from 'material-ui-nested-menu-item'

// Renders either a MenuItem or NestedMenuItem depending if the current item has children
const ChildItem = ({ item, parentOpen, ChildIndicatorIcon, classes }) => {
  const hasChildren = item.children !== undefined && item.children.length > 0

  const itemContent = (
    <>
      {item.leftIconClass && (
        <Icon
          fontSize="inherit"
          className={clsx(item.leftIconClass, classes.icons)}
        />
      )}
      {item.label}
      {item.rightIconClass && (
        <Icon
          fontSize="inherit"
          className={clsx(item.rightIconClass, classes.icons)}
        />
      )}
    </>
  )

  return hasChildren ? (
    <NestedMenuItem
      to={item.to}
      // NestedMenuItem accepts a component property, but for now it is not used
      // Instead we render everything in the label
      label={
        <Link to={item.to || '#'} className={clsx(classes.links)}>
          {itemContent}
          {ChildIndicatorIcon}
        </Link>
      }
      parentMenuOpen={parentOpen}
      rightIcon={null}
    >
      {item.children.map(child => (
        <ChildItem
          key={`${child.label}-${child.to}`}
          item={child}
          parentOpen={parentOpen}
          classes={classes}
          ChildIndicatorIcon={ChildIndicatorIcon}
        />
      ))}
    </NestedMenuItem>
  ) : (
    <MenuItem component={Link} to={item.to}>
      {itemContent}
    </MenuItem>
  )
}

// Renders a root menu item, wrapped in a button
const RootItem = ({ item, ChildIndicatorIcon, classes }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const hasChildren = item.children !== undefined && item.children.length > 0

  const childItems = hasChildren ? (
    // Wrap any children in a Menu
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      {item.children.map(child => (
        <ChildItem
          key={`${child.label}-${child.to}`}
          parentOpen={Boolean(anchorEl)}
          item={child}
          ChildIndicatorIcon={ChildIndicatorIcon}
          classes={classes}
        />
      ))}
    </Menu>
  ) : null

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        component={hasChildren ? undefined : Link}
        to={hasChildren ? undefined : item.to}
        onClick={hasChildren ? e => setAnchorEl(e.currentTarget) : undefined}
      >
        {item.leftIconClass && (
          <Icon
            fontSize="inherit"
            className={clsx(item.leftIconClass, classes.icons)}
          />
        )}
        {item.label}
        {item.rightIconClass && (
          <Icon
            fontSize="inherit"
            className={clsx(item.rightIconClass, classes.icons)}
          />
        )}
      </Button>
      {childItems}
    </>
  )
}

const HorizontalNavigationMenu = ({
  data,
  childIndicatorIcon = 'fas fa-caret-right',
  classes,
}) => {
  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.1/css/all.css',
      document.querySelector('#font-awesome-css')
    )
  }, [])
  const ChildIndicatorIcon = (
    <Icon
      fontSize="inherit"
      className={clsx(childIndicatorIcon, classes.childIndicatorIcons)}
    />
  )
  return data.map(item => (
    <RootItem
      key={item.label}
      item={item}
      ChildIndicatorIcon={ChildIndicatorIcon}
      classes={classes}
    />
  ))
}

const styles = () => ({
  childIndicatorIcons: {
    marginLeft: '8px',
    marginRight: '0',
  },
  icons: {
    marginLeft: '8px',
    marginRight: '8px',
  },
  links: {
    textDecoration: 'none',
    color: 'inherit',
  },
})

const StyledHorizontalNavigationMenu = withStyles(styles)(
  HorizontalNavigationMenu
)

export default StyledHorizontalNavigationMenu
