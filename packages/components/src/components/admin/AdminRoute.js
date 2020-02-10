import React, { useContext, useState } from 'react'
import T from 'prop-types'
import { Router, Redirect } from '@reach/router'

import { AuthContext } from '../authorization/AuthWrapper'
import PaddedContainer from '../PaddedContainer'
import PendingUsers from './PendingUsers'
import AllUsers from './AllUsers'
import AdminToolbar from './AdminToolbar'
import UserGroups from './UserGroups'
import GroupUsers from './GroupUsers'

function AdminRoute({ SEO }) {
  const { getUserAuth } = useContext(AuthContext)
  const [pageTitle, setPageTitle] = useState('')

  const canAccessPendingUsers = getUserAuth('platform-admin')
  const canAccessGroups = getUserAuth('partner-admin')

  const userCanAccess = {
    pendingUsers: canAccessPendingUsers,
    allUsers: true,
    groups: canAccessGroups,
  }
  const defaultSection = canAccessPendingUsers ? 'pending-users' : 'all-users'

  return (
    <PaddedContainer>
      {SEO && <SEO title={`${pageTitle} | Admin`} />}
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

AdminRoute.propTypes = {
  SEO: T.elementType,
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
