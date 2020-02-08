import React, { useState, useEffect } from 'react'
import { loadCSS } from 'fg-loadcss'
import T from 'prop-types'
// Gatsby Link doesn't work with storybook so use @reach/router https://github.com/gatsbyjs/gatsby/issues/10668
import { Link } from '@reach/router'

import { ListItem, ListItemText, Icon, Collapse } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const containsPath = (path, root) => {
  if (root.to === path) return true
  if (!root.children) return false

  return root.children.some(child => containsPath(path, child))
}

function ListOfListItems({
  data = [],
  userRole,
  path,
  isFullyExpanded = false,
  depthIndent = 20,
}) {
  const [links, setLinks] = useState([])

  useEffect(
    function addOpenProperty(current, init = true, hitPath = false) {
      if (isFullyExpanded) return
      if (init) {
        current = data
      }

      current.forEach(link => {
        if (link.children) {
          if (!hitPath) {
            hitPath = link.to === path
          }

          link.open =
            hitPath && link.to !== path ? false : containsPath(path, link)
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
        <React.Fragment key={link.to}>
          <ListItem button component={Link} to={link.to} onClick={link.onClick}>
            <div style={{ paddingRight: `${depth * depthIndent}px` }} />
            <Icon
              color={link.to === path ? 'action' : 'primary'}
              className={link.iconClass}
            />
            <ListItemText primary={link.label} />
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

  return <> {recursiveMap(data, 0)} </>
}

ListOfListItems.propTypes = {
  data: T.object.isRequired,
  userRole: T.oneOf(['Admin', 'User']),
  path: T.string.isRequired,
  isFullyExpanded: T.bool.isRequired,
  depthIndent: T.number.isRequired,
}

export default ListOfListItems
