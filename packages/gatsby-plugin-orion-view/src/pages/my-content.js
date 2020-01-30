import React from 'react'
import { Router } from '@reach/router'

import { ProtectedRoute } from 'components'
import MyContentRoute from 'gatsby-plugin-orion-core/components/my-content/MyContentRoute'

export default function MyContent() {
  return (
    <Router basepath="/my-content">
      <ProtectedRoute requiresGroup component={MyContentRoute} path="*" />
    </Router>
  )
}
