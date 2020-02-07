import React, { useState, useEffect } from 'react'
import { loadCSS } from 'fg-loadcss'
import T from 'prop-types'
// Gatsby Link doesn't work with storybook so use @reach/router https://github.com/gatsbyjs/gatsby/issues/10668
import { Link } from '@reach/router'

import {
  withStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Icon,
  Collapse,
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Close from '@material-ui/icons/Close'

const containsPath = (path, root) => {
  if (root.linkDestination === path) return true
  if (!root.children) return false

  return root.children.some(child => containsPath(path, child))
}

function VerticalNavigationBar({
  classes,
  closeSidebar,
  data = '[]',
  variant = 'permanent',
  userRole,
  path,
  isFullyExpanded = false,
  depthIndent = 20,
  ...props
}) {
  const [links, setLinks] = useState([])

  useEffect(
    function addOpenProperty(current, init = true, hitPath = false) {
      if (isFullyExpanded) return
      if (init) {
        current = JSON.parse(data)
      }

      current.forEach(link => {
        if (link.children) {
          if (!hitPath) {
            hitPath = link.linkDestination === path
          }

          link.open =
            hitPath && link.linkDestination !== path
              ? false
              : containsPath(path, link)
          addOpenProperty(link.children, false, hitPath)
        }
      })

      if (init) setLinks(current)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path, isFullyExpanded, data]
  )

  const onClickHandler = link => e => {
    e.preventDefault()

    if (link.open !== undefined) {
      link.open = !link.open
      // To clone state so that mutation errors don't occur
      setLinks(JSON.parse(JSON.stringify(links)))
    }
  }

  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.1/css/all.css',
      document.querySelector('#font-awesome-css')
    )
  }, [])

  const recursiveMap = (
    data,
    depth // Role based permission check until people permissions check or a role hierarchy can be set
  ) =>
    data
      .filter(
        link =>
          !(
            link.linkAuth &&
            link.linkAuth.role &&
            link.linkAuth.role !== userRole
          )
      )
      .map(link => (
        <React.Fragment key={link.linkDestination}>
          <ListItem button component={Link} to={link.linkDestination}>
            <div style={{ paddingRight: `${depth * depthIndent}px` }} />
            <Icon
              color={link.linkDestination === path ? 'action' : 'primary'}
              className={link.iconClass}
            />
            <ListItemText primary={link.linkTitle} />
            {link.children && !isFullyExpanded && (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>
                {link.open ? (
                  <ExpandLess
                    className="expand-icon"
                    onClick={onClickHandler(link)}
                  />
                ) : (
                  <ExpandMore
                    className="expand-icon"
                    onClick={onClickHandler(link)}
                  />
                )}
              </>
            )}
          </ListItem>
          {link.children && (
            <Collapse
              unmountOnExit
              in={isFullyExpanded || link.open}
              timeout="auto"
            >
              {recursiveMap(link.children, depth + 1)}
            </Collapse>
          )}
        </React.Fragment>
      ))

  return (
    <Drawer
      // Classes needs to be done as such in order to fix the width https://stackoverflow.com/a/45650318
      variant={variant}
      {...props}
    >
      <List>
        {variant === 'persistent' && (
          <ListItem>
            <span className={classes.headerHead}>
              <IconButton className={classes.iconButton} onClick={closeSidebar}>
                <Close className={classes.closeSidebar} />
              </IconButton>
            </span>
          </ListItem>
        )}
        {recursiveMap(links, 0)}
      </List>
    </Drawer>
  )
}

VerticalNavigationBar.propTypes = {
  classes: T.object.isRequired,
  data: T.object.isRequired,
  variant: T.oneOf(['permanent', 'persistent']).isRequired,
  userRole: T.oneOf(['Admin', 'User']),
  path: T.string.isRequired,
  isFullyExpanded: T.bool.isRequired,
  depthIndent: T.number.isRequired,
  className: T.string,
  closeSidebar: T.func,
}

const styles = theme => ({
  headerHead: {
    width: '100%',
    paddingTop: '0px',
  },
  iconButton: {
    float: 'right',
    padding: '4px',
  },
  closeSidebar: {
    color: theme.palette.primary.contrastText,
  },
})

export default withStyles(styles)(VerticalNavigationBar)
