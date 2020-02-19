import React from 'react'
import { Link } from '@reach/router'
import { useQuery } from 'graphql-hooks'
import getPageChildrenQuery from '../../queries/get-page-children.graphql'

function ListChildren({ page }) {
  const { loading, data } = useQuery(getPageChildrenQuery, {
    variables: {
      page: page.id
    }
  })

  if (loading) {
    return null
  }

  return (
    <ul>
      {data.orion_page.map(({ id, path, title }) => (
        <li key={id}>
          <Link to={path}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ListChildren
