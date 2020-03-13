import React from 'react'
import T from 'prop-types'
import ListOfListItems from '../ListOfListItems'
import { List, makeStyles } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiListItemText-root': {
      color: theme.palette.background.default,
    },
    '& .MuiListItem-root': {
      color: theme.palette.tertiary.main,
      '& > .MuiIcon-colorPrimary': {
        color: theme.palette.tertiary.main,
      },
      '& > .MuiIcon-colorAction': {
        color: theme.palette.action.main,
      },
      '& > .MuiIcon-root': {
        marginRight: '8px',
      },
      '& > .expand-icon': {
        height: '32px',
        width: '32px',
      },
    },
    '& .close-button': {
      color: theme.palette.tertiary.main,
    },
    '& .MuiListItem-button': {
      '&:hover': {
        backgroundColor: fade(theme.palette.secondary.main, 0.85),
      },
    },
  },
}))

function SideBarMenu({
  data = [],
  userRole,
  path,
  isFullyExpanded = false,
  depthIndent = 20,
}) {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      <ListOfListItems
        data={data}
        userRole={userRole}
        currentPath={path}
        isFullyExpanded={isFullyExpanded}
        depthIndent={depthIndent}
      />
    </List>
  )
}

SideBarMenu.propTypes = {
  data: T.array.isRequired,
  userRole: T.oneOf(['Admin', 'User']),
  path: T.string.isRequired,
  isFullyExpanded: T.bool.isRequired,
  depthIndent: T.number.isRequired,
}

export default SideBarMenu
