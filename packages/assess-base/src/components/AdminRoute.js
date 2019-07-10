import React, { useState } from 'react'
import T from 'prop-types'
import { Router, Redirect } from '@reach/router'
import { PaddedContainer } from 'components'

import SEO from './SEO'
import PendingUsers from './PendingUsers'
import AllUsers from './AllUsers'
import AdminToolbar from './AdminToolbar'
import UserGroups from './UserGroups'
import GroupUsers from './GroupUsers'

function AdminRoute() {
  const [pageTitle, setPageTitle] = useState('')

  return (
    <PaddedContainer>
      <SEO title={`${pageTitle} | Admin`} />
      <AdminToolbar pageTitle={pageTitle} />
      <Router>
        <AdminSection
          path="pending-users"
          component={PendingUsers}
          applyPageTitle={() => setPageTitle('Pending users')}
        />
        <AdminSection
          path="all-users"
          component={AllUsers}
          applyPageTitle={() => setPageTitle('All users')}
        />
        <AdminSection
          path="groups"
          component={UserGroups}
          applyPageTitle={() => setPageTitle('Groups')}
        />
        <AdminSection
          path="groups/:groupIdString/:groupName"
          component={GroupUsers}
          applyPageTitle={({ groupName }) =>
            setPageTitle(`Users in ${groupName}`)
          }
        />
        <Redirect default noThrow from="/admin" to="/admin/pending-users" />
      </Router>
    </PaddedContainer>
  )
}

function AdminSection({ component: AdminComponent, applyPageTitle, ...props }) {
  applyPageTitle(props)
  return <AdminComponent {...props} />
}

AdminSection.propTypes = {
  component: T.elementType.isRequired,
  applyPageTitle: T.func.isRequired,
}

export default AdminRoute
