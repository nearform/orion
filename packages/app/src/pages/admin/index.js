import React from 'react'
import { Router } from '@reach/router'

import ProtectedRoute from '../../components/ProtectedRoute'
import AdminRoute from '../../components/AdminRoute'

export default function Admin() {
  return (
    <Router basepath="/admin">
      <ProtectedRoute allowedRole="admin" component={AdminRoute} path="*" />
    </Router>
  )
}
