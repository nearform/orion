import React from 'react'
import { Router } from '@reach/router'

import SearchResults from '../components/content/SearchResults'
import ProtectedRoute from '../components/ProtectedRoute'

export default function Content() {
  return (
    <Router>
      <ProtectedRoute
        requiresGroup
        component={SearchResults}
        path="/search/:term"
      />
      <SearchResults path="/search/:term" />
    </Router>
  )
}
