import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Collapse } from '@material-ui/core'

import ListItem from '../ListItem'

const containsPath = (path, root) => {
  if (root.to === path) return true
  if (!root.children) return false

  return root.children.some(child => containsPath(path, child))
}

function ListOfListItems({
  data = [],
  userRole,
  currentPath,
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
            hitPath = link.to === currentPath
          }

          link.open =
            hitPath && link.to !== currentPath
              ? false
              : containsPath(currentPath, link)
          addOpenProperty(link.children, false, hitPath)
        }
      })

      if (init) setLinks(current)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPath, isFullyExpanded, data]
  )

  const onClickHandler = link => e => {
    e.preventDefault()

    if (link.open !== undefined) {
      link.open = !link.open
      // To clone state so that mutation errors don't occur
      setLinks(JSON.parse(JSON.stringify(links)))
    }
  }

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
          <ListItem
            to={link.to}
            currentPath={currentPath}
            iconClass={link.iconClass}
            isOpen={link.open}
            handleOpen={
              link.children && !isFullyExpanded
                ? onClickHandler(link)
                : undefined
            }
            depthLevel={depth}
            depthIndent={depthIndent}
            label={link.label}
            hasActionHighlight={link.hasActionHighlight}
            onClick={link.onClick}
          />
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
  currentPath: T.string.isRequired,
  isFullyExpanded: T.bool.isRequired,
  depthIndent: T.number.isRequired,
}

export default ListOfListItems
