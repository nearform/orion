import React from 'react'
import { Router } from '@reach/router'

import ProtectedRoute from '../components/ProtectedRoute'
import MyContentRoute from '../components/MyContentRoute'

export default function MyContent() {
  return (
    <Router basepath="/my-content">
      <ProtectedRoute component={MyContentRoute} path="*" />
    </Router>
  )
}
