import React from 'react'
import { Router } from '@reach/router'
import { graphql } from 'gatsby'

import ProtectedRoute from '../../components/ProtectedRoute'
import AdminRoute from '../../components/AdminRoute'

export default function Admin({ data }) {
  return (
    <Router>
      <ProtectedRoute
        allowedRole="admin"
        component={AdminRoute}
        path="admin/*"
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
