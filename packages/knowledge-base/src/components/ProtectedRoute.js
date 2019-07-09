import React, { useContext } from 'react'
import T from 'prop-types'
import { Redirect } from '@reach/router'

import { getUserRolesSync, getUserGroupIdSync } from '../utils/auth'
import AuthInitContext from '../utils/AuthInitContext'

export default function ProtectedRoute({
  allowedRole,
  allowedRoles,
  requiresGroup,
  component: Component,
  ...props
}) {
  const isAuthInitialized = useContext(AuthInitContext)
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
