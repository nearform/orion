import React, { useEffect, useState } from 'react'
import T from 'prop-types'

import { List, Paper } from '@material-ui/core'

import ListOfListItems from '../ListOfListItems'

function VerticalNavigationMenu({
  data = [],
  userRole,
  path,
  depthIndent = 20,
  ...props
}) {
  const [modifiedData, setModifiedData] = useState(
    JSON.parse(JSON.stringify(data))
  )

  useEffect(
    function addIcon(current, init = true) {
      if (init) {
        current = modifiedData
      }

      current.forEach(link => {
        link.iconClass = 'fas fa-long-arrow-alt-right'

        if (link.children) {
          addIcon(link.children, false)
        }
      })
      if (init) {
        setModifiedData(JSON.parse(JSON.stringify(modifiedData)))
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  return (
    <Paper elevation={0} {...props}>
      <List>
        <ListOfListItems
          isFullyExpanded
          data={modifiedData}
          userRole={userRole}
          currentPath={path}
          depthIndent={depthIndent}
        />
      </List>
    </Paper>
  )
}

VerticalNavigationMenu.propTypes = {
  data: T.object.isRequired,
  variant: T.oneOf(['permanent', 'persistent']).isRequired,
  userRole: T.oneOf(['Admin', 'User']),
  path: T.string.isRequired,
  depthIndent: T.number.isRequired,
}

export default VerticalNavigationMenu
