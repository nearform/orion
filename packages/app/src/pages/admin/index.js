import React from 'react'
import { Router } from '@reach/router'
import { graphql } from 'gatsby'
import { useQuery } from 'graphql-hooks'

const ADMIN_QUERY = `query HomePage {
  user {
    id
    name
  }
}`

function AdminRoute() {
  const { loading, error, data: users } = useQuery(ADMIN_QUERY)

  if (loading) return 'Loading...'
  if (error) return 'Error!'

  return <pre>{JSON.stringify(users, null, 2)}</pre>
}

export default function Admin({ data }) {
  return (
    <Router>
      <AdminRoute path="/admin" data={data} />
    </Router>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
