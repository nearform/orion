import React from 'react'
import T from 'prop-types'
// Gatsby Link doesn't work with storybook so use @reach/router https://github.com/gatsbyjs/gatsby/issues/10668
import { Link } from '@reach/router'

import { ListItem, ListItemText, Icon } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

function CustomListItem({
  to,
  label,
  onClick,
  currentPath,
  iconClass,
  isOpen,
  handleOpen,
  depthLevel,
  depthIndent,
  hasActionHighlight, // Force Action color styling
}) {
  return (
    <ListItem
      button
      component={to ? Link : undefined}
      to={to}
      onClick={onClick}
    >
      <div style={{ paddingRight: `${depthLevel * depthIndent}px` }} />
      <Icon
        color={to === currentPath || hasActionHighlight ? 'action' : 'primary'}
        className={iconClass}
      />
      <ListItemText primary={label} />
      {handleOpen !== undefined && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {isOpen ? (
            <ExpandLess className="expand-icon" onClick={handleOpen} />
          ) : (
            <ExpandMore className="expand-icon" onClick={handleOpen} />
          )}
        </>
      )}
    </ListItem>
  )
}

CustomListItem.propTypes = {
  to: T.string,
  label: T.string.isRequired,
  onClick: T.func,
  currentPath: T.string.isRequired,
  iconClass: T.string, // Font Awesome class string
  isOpen: T.bool,
  handleOpen: T.func, // Doubles as if it can open
  depthLevel: T.number,
  depthIndent: T.number,
  hasActionHighlight: T.bool,
}

CustomListItem.defaultProps = {
  to: '',
  onClick: () => {},
  iconClass: '',
  isOpen: false,
  handleOpen: () => {},
  depthLevel: 0,
  depthIndent: 0,
  hasActionHighlight: false,
}

export default CustomListItem
