import React from 'react'
import PropTypes from 'prop-types'
import RootItem from './RootItem'

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
