import React from 'react'
import { Router } from '@reach/router'

import Layout from './layout'
import PendingUsers from './PendingUsers'
import AdminToolbar from './AdminToolbar'
import UserGroups from './UserGroups'
import SEO from './seo'

export default function AdminRoute({ data, location }) {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Admin" />
      <AdminToolbar />
      <Router>
        <PendingUsers default path="pending-users" />
        <UserGroups path="groups" />
      </Router>
    </Layout>
  )
}
