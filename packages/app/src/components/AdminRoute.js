import React from 'react'
import { Router } from '@reach/router'
import { withStyles } from '@material-ui/core'

import Layout from './layout'
import PendingUsers from './PendingUsers'
import AllUsers from './AllUsers'
import AdminToolbar from './AdminToolbar'
import UserGroups from './UserGroups'
import SEO from './seo'

function AdminRoute({ data, location, classes }) {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Admin" />
      <AdminToolbar className={classes.toolbar} />
      <Router>
        <PendingUsers default path="pending-users" />
        <AllUsers path="all-users" />
        <UserGroups path="groups" />
      </Router>
    </Layout>
  )
}

const styles = theme => ({
  toolbar: {
    marginBottom: theme.spacing.unit * 2,
  },
})

export default withStyles(styles)(AdminRoute)
