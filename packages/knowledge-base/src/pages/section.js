import React from 'react'
import { Router } from '@reach/router'

import ListContent from '../components/content/ListContent'
import ProtectedRoute from '../components/ProtectedRoute'

export default function Content() {
  return (
    <Router>
      <ProtectedRoute
        requiresGroup
        component={ListContent}
        path="/section/:cat"
      />
      <ListContent path="/section/:cat" />
    </Router>
  )
}
