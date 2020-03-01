import React from 'react'
import { Link } from '@reach/router'

function ListChildren({ page }) {
  const children = page.descendants.filter(descendant => descendant.direct)
  const descendants = page.descendants.filter(descendant => !descendant.direct)

  const render = ({ descendant: { id, path, title } }) => (
    <li key={id}>
      <Link to={path}>{title}</Link>
    </li>
  )

  return (
    <ul>
      {children.length > 0 && (
        <li>
          Direct children
          <ul>{children.map(render)}</ul>
        </li>
      )}
      {descendants.length > 0 && (
        <li>
          Other descendants
          <ul>{descendants.map(render)}</ul>
        </li>
      )}
    </ul>
  )
}

export default ListChildren
