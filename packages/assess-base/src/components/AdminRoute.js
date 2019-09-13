import React, { useState } from 'react'
import T from 'prop-types'
import { Router, Redirect } from '@reach/router'
import { PaddedContainer } from 'components'

import { hasPermissions } from '../utils/auth'
import SEO from './SEO'
import PendingUsers from './PendingUsers'
import AllUsers from './AllUsers'
import AdminToolbar from './AdminToolbar'
import UserGroups from './UserGroups'
import GroupUsers from './GroupUsers'

function AdminRoute() {
  const [pageTitle, setPageTitle] = useState('')

  const canAdministerGroups = hasPermissions('platform-admin')

  const userCanAccess = {
    pendingUsers: canAdministerGroups,
    allUsers: true,
    groups: canAdministerGroups,
  }
  const defaultSection = canAdministerGroups ? 'pending-users' : 'all-users'

  return (
    <PaddedContainer>
      <SEO title={`${pageTitle} | Admin`} />
      <AdminToolbar pageTitle={pageTitle} userCanAccess={userCanAccess} />
      <Router>
        {userCanAccess.pendingUsers && (
          <AdminSection
            path="pending-users"
            component={PendingUsers}
            applyPageTitle={() => setPageTitle('Pending users')}
          />
        )}
        {userCanAccess.allUsers && (
          <AdminSection
            path="all-users"
            component={AllUsers}
            applyPageTitle={() => setPageTitle('All users')}
          />
        )}
        {userCanAccess.groups && (
          <AdminSection
            path="groups"
            component={UserGroups}
            applyPageTitle={() => setPageTitle('Groups')}
          />
        )}
        {userCanAccess.groups && (
          <AdminSection
            path="groups/:groupIdString/:groupName"
            component={GroupUsers}
            applyPageTitle={({ groupName }) =>
              setPageTitle(`Users in ${groupName}`)
            }
          />
        )}
        <Redirect
          default
          noThrow
          from="/admin"
          to={`/admin/${defaultSection}`}
        />
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
