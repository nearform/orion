import React, { useContext } from 'react'
import T from 'prop-types'
import { Redirect } from '@reach/router'

import { AuthContext } from './AuthWrapper'

export default function ProtectedRoute({
  allowedRole,
  requiresGroup,
  component: Component,
  ...props
}) {
  const { isAuthInitialized, getUserTokenData, hasPermissions } = useContext(
    AuthContext
  )

  //skip rendering if auth is not yet initialized
  if (!isAuthInitialized) {
    return null
  }

  const { isAuthenticated, groupId } = getUserTokenData()

  // Redirect if any of following true:
  // - User not authenticated;
  // - Group required but no group ID;
  // - Role specified but no role permissions.
  const redirect =
    !isAuthenticated ||
    (requiresGroup && !groupId) ||
    (allowedRole && !hasPermissions(allowedRole))

  if (redirect) {
    return <Redirect to="/auth" noThrow />
  }

  return <Component {...props} />
}

ProtectedRoute.propTypes = {
  allowedRole: T.string,
  requiresGroup: T.bool,
  component: T.elementType.isRequired,
}
