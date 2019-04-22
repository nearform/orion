import React from 'react'
import { Router } from '@reach/router'
import { withStyles } from '@material-ui/core'
import { PaddedContainer } from 'components'

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
      <PaddedContainer>
        <AdminToolbar className={classes.toolbar} />
        <Router>
          <PendingUsers default path="pending-users" />
          <AllUsers path="all-users" />
          <UserGroups path="groups" />
          <GroupUsers path="groups/:groupId/:groupName" />
        </Router>
      </PaddedContainer>
    </>
  )
}

const styles = theme => ({
  toolbar: {
    marginBottom: theme.spacing.unit * 2,
  },
})

export default withStyles(styles)(AdminRoute)
