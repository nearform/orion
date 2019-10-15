import React from 'react'
import { Router } from '@reach/router'

import { AdminRoute, ProtectedRoute } from 'components'
import SEO from '../components/SEO'

function AdminRouteWithSEO() {
  return <AdminRoute SEO={SEO} />
}

export default function Admin() {
  return (
    <Router basepath="/admin">
      <ProtectedRoute
        allowedRole={'company-admin'}
        component={AdminRouteWithSEO}
        path="*"
      />
    </Router>
  )
}
