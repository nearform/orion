import React from 'react'
import { navigate } from 'gatsby'
import T from 'prop-types'

import { isAuthenticated, getUserRoles } from '../utils/auth'

const isBrowser = typeof window !== `undefined`

export default function ProtectedRoute({
  role,
  component: Component,
  ...props
}) {
  if (!isAuthenticated()) {
    if (isBrowser) navigate('/')
    return null
  }

  if (role) {
    const userRoles = getUserRoles()

    if (!userRoles.includes(role)) {
      if (isBrowser) navigate('/')
      return null
    }
  }

  return <Component {...props} />
}

ProtectedRoute.propTypes = {
  role: T.string,
  component: T.elementType.isRequired,
}
