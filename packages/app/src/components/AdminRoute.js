import React from 'react'
import { Router } from '@reach/router'
import { withStyles } from '@material-ui/core'

import PendingUsers from './PendingUsers'
import AllUsers from './AllUsers'
import AdminToolbar from './AdminToolbar'
import UserGroups from './UserGroups'
import GroupUsers from './GroupUsers'
import SEO from './seo'

function AdminRoute({ classes }) {
  return (
    <>
      <SEO title="Admin" />
      <AdminToolbar className={classes.toolbar} />
      <Router>
        <PendingUsers default path="pending-users" />
        <AllUsers path="all-users" />
        <UserGroups path="groups" />
        <GroupUsers path="groups/:groupId/:groupName" />
      </Router>
    </>
  )
}

const styles = theme => ({
  toolbar: {
    marginBottom: theme.spacing.unit * 2,
  },
})

export default withStyles(styles)(AdminRoute)
