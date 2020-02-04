import React from 'react'
import { Router } from '@reach/router' // eslint-disable-line import/no-extraneous-dependencies

import { ProtectedRoute } from 'components'
import MyContentRoute from '../components/my-content/MyContentRoute'

export default function MyContent() {
  return (
    <Router basepath="/my-content">
      <ProtectedRoute requiresGroup component={MyContentRoute} path="*" />
    </Router>
  )
}
