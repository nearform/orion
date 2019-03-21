import React from 'react'
import { Router } from '@reach/router'
import { graphql } from 'gatsby'

function AdminRoute() {
  return 'hello world'
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
