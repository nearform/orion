import React from 'react'
import { Router } from '@reach/router' // eslint-disable-line import/no-extraneous-dependencies

import { AdminRoute, ProtectedRoute } from 'components'

export default function Admin() {
  return (
    <Router basepath="/admin">
      <ProtectedRoute
        allowedRole="company-admin"
        component={AdminRoute}
        path="*"
      />
    </Router>
  )
}
