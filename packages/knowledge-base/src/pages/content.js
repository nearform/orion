import React from 'react'
import { Router } from '@reach/router'

import ViewArticle from '../components/content/ViewArticle'
import ProtectedRoute from '../components/ProtectedRoute'

export default function Content() {
  return (
    <Router>
      <ProtectedRoute
        requiresGroup
        component={ViewArticle}
        path="/content/:slug"
      />
      <ViewArticle path="/content/:slug" />
    </Router>
  )
}
