import React from 'react'
import { Router } from '@reach/router'

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
