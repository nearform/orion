import React from 'react'
import { Router } from '@reach/router'

import ProtectedRoute from '../components/ProtectedRoute'
import ViewArticle from '../components/ViewArticle'

export default function Content() {
  return (
    <Router basepath="/content">
      <ProtectedRoute component={ViewArticle} path=":contentId" />
    </Router>
  )
}
