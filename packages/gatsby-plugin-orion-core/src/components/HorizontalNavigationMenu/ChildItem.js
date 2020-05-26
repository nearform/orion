import React, { forwardRef } from 'react'
import NestedMenuItem from '../NestedMenuItem'
import { Icon } from '@material-ui/core'
import { Link } from '@reach/router'

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
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        classes: { paper: classes.menu },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
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

export default ChildItem
