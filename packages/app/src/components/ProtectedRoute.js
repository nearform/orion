import React from 'react'
import { navigate } from 'gatsby'
import T from 'prop-types'

import { isAuthenticated, getUserRoles } from '../utils/auth'

const isBrowser = typeof window !== `undefined`

export default function ProtectedRoute({
  allowedRole,
  component: Component,
  ...props
}) {
  if (!isAuthenticated()) {
    if (isBrowser) navigate('/')
    return null
  }

  if (allowedRole) {
    const userRoles = getUserRoles()

    if (!userRoles.includes(allowedRole)) {
      if (isBrowser) navigate('/')
      return null
    }
  }

  return <Component {...props} />
}

ProtectedRoute.propTypes = {
  allowedRole: T.string,
  component: T.elementType.isRequired,
}
