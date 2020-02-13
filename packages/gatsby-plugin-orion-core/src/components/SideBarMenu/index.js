import React from 'react'
import T from 'prop-types'

import {
  withStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'

import ListOfListItems from '../ListOfListItems'

function SideBarMenu({
  classes,
  closeSidebar,
  data = [],
  variant = 'permanent',
  userRole,
  path,
  isFullyExpanded = false,
  depthIndent = 20,
  ...props
}) {
  return (
    <Drawer variant={variant} {...props}>
      <List>
        {variant === 'persistent' && (
          <ListItem>
            <span className={classes.headerHead}>
              <IconButton className={classes.iconButton} onClick={closeSidebar}>
                <Close className="close-button" />
              </IconButton>
            </span>
          </ListItem>
        )}
        <ListOfListItems
          data={data}
          userRole={userRole}
          currentPath={path}
          isFullyExpanded={isFullyExpanded}
          depthIndent={depthIndent}
        />
      </List>
    </Drawer>
  )
}

SideBarMenu.propTypes = {
  classes: T.object.isRequired,
  data: T.object.isRequired,
  variant: T.oneOf(['permanent', 'persistent']).isRequired,
  userRole: T.oneOf(['Admin', 'User']),
  path: T.string.isRequired,
  isFullyExpanded: T.bool.isRequired,
  depthIndent: T.number.isRequired,
  closeSidebar: T.func,
}

const styles = () => ({
  headerHead: {
    width: '100%',
    paddingTop: '0px',
  },
  iconButton: {
    float: 'right',
    padding: '4px',
  },
})

export default withStyles(styles)(SideBarMenu)
