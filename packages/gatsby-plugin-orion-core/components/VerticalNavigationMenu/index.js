import React from 'react'
import T from 'prop-types'

import { List, Paper } from '@material-ui/core'

import ListOfListItems from '../ListOfListItems'

function VerticalNavigationMenu({
  classes,
  data = [],
  userRole,
  path,
  depthIndent = 20,
  ...props
}) {
  return (
    <Paper {...props}>
      <List>
        <ListOfListItems
          isFullyExpanded
          data={data}
          userRole={userRole}
          currentPath={path}
          depthIndent={depthIndent}
        />
      </List>
    </Paper>
  )
}

VerticalNavigationMenu.propTypes = {
  classes: T.object.isRequired,
  data: T.object.isRequired,
  variant: T.oneOf(['permanent', 'persistent']).isRequired,
  userRole: T.oneOf(['Admin', 'User']),
  path: T.string.isRequired,
  depthIndent: T.number.isRequired,
}

export default VerticalNavigationMenu
