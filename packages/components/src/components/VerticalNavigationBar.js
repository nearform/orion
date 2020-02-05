import React, { useContext, useState, useEffect } from 'react'
import clsx from 'clsx'
import { loadCSS } from 'fg-loadcss'
import T from 'prop-types'

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

import { NavLink } from 'components'

const containsPath = (path, root) => {
  if (root.linkDestination === path) return true
  if (!root.children) return false

  return root.children.some(child => containsPath(path, child))
}

function VerticalNavigationBar({
  classes,
  closeSidebar,
  data = '[]',
  variant,
  userRole = 'User',
  path,
  fullyExpanded,
  depthIndent,
  ...props
}) {
  const [links, setLinks] = useState([])

  useEffect(
    function addOpenProperty(current, init = true, hitPath = false) {
      if (fullyExpanded) return
      if (init) {
        current = JSON.parse(data)
      }

      current.forEach(link => {
        if (link.children) {
          if (!hitPath) {
            hitPath = link.linkDestination === path
          }

          link.open = !hitPath ? containsPath(path, link) : false
          addOpenProperty(link.children, false, hitPath)
        }
      })

      if (init) setLinks(current)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path, fullyExpanded, data]
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
        <>
          <ListItem button component={NavLink} to={link.linkDestination}>
            <div style={{ paddingRight: `${depth * depthIndent}px` }} />
            <Icon className={clsx(link.iconClass, classes.icons)} />
            <ListItemText primary={link.linkTitle} />
            {link.children && !fullyExpanded && (
              <>
                {link.open ? (
                  <ExpandLess onClick={onClickHandler(link)} />
                ) : (
                  <ExpandMore onClick={onClickHandler(link)} />
                )}
              </>
            )}
          </ListItem>
          {link.children && (
            <Collapse
              unmountOnExit
              in={fullyExpanded || link.open}
              timeout="auto"
            >
              {recursiveMap(link.children, depth + 1)}
            </Collapse>
          )}
        </>
      ))

  return (
    <Drawer
      // Classes needs to be done as such in order to fix the width https://stackoverflow.com/a/45650318
      classes={{ paper: classes.paper }}
      className={classes.root}
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
  className: T.string,
  closeSidebar: T.func,
}

const styles = () => ({
  icons: {
    marginRight: '8px',
  },
  paper: {
    width: '60%',
  },
})

export default withStyles(styles)(VerticalNavigationBar)
