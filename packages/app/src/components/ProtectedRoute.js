import React from 'react'
import T from 'prop-types'
import { Redirect } from '@reach/router'

import { isAuthenticatedSync, getUserRolesSync } from '../utils/auth'

export default function ProtectedRoute({
  allowedRole,
  component: Component,
  ...props
}) {
  if (!isAuthenticatedSync()) {
    return <Redirect to="/auth" noThrow />
  }

  if (allowedRole) {
    if (!getUserRolesSync().includes(allowedRole)) {
      return <Redirect to="/auth" noThrow />
    }
  }

  return <Component {...props} />
}

ProtectedRoute.propTypes = {
  allowedRole: T.string,
  component: T.elementType.isRequired,
}
