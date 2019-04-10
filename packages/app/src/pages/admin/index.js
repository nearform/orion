import React from 'react'
import { Router } from '@reach/router'
import { graphql } from 'gatsby'
import { useQuery } from 'graphql-hooks'

import ProtectedRoute from '../../components/ProtectedRoute'
import Layout from '../../components/layout'

const getPendingUsers = `query getPendingUsers {
  user(where: { pending: { _eq: true } }) {
    id
    name
    pending
  }
}`

function AdminRoute({ data, location }) {
  const siteTitle = data.site.siteMetadata.title

  const { loading, error, data: users } = useQuery(getPendingUsers)

  if (loading) return 'Loading...'
  if (error) return 'Error!'

  return (
    <Layout location={location} title={siteTitle}>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>pending</th>
          </tr>
        </thead>
        <tbody>
          {users.user.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.pending.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default function Admin({ data }) {
  return (
    <Router>
      <ProtectedRoute
        role="admin"
        component={AdminRoute}
        path="/admin"
        data={data}
      />
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
