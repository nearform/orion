import React from 'react'
import T from 'prop-types'
import { Redirect } from '@reach/router'

import { getUserRolesSync, getUserGroupIdSync } from '../utils/auth'
import { useIsAuthInitialized } from '../utils/auth'

export default function ProtectedRoute({
  allowedRole,
  allowedRoles,
  requiresGroup,
  component: Component,
  ...props
}) {
  const isAuthInitialized = useIsAuthInitialized()
  //skip rendering if auth is not yet initialized
  if (!isAuthInitialized) {
    return null
  }
  if (requiresGroup) {
    if (!getUserGroupIdSync()) {
      return <Redirect to="/auth" noThrow />
    }
  }

  if (allowedRole) {
    if (!getUserRolesSync().includes(allowedRole)) {
      return <Redirect to="/auth" noThrow />
    }
  }

  if (allowedRoles) {
    if (!allowedRoles.some(role => getUserRolesSync().includes(role))) {
      return <Redirect to="/auth" noThrow />
    }
  }

  return <Component {...props} />
}

ProtectedRoute.propTypes = {
  allowedRole: T.string,
  allowedRoles: T.arrayOf(T.string),
  requiresGroup: T.bool,
  component: T.elementType.isRequired,
}
