import React from 'react'
import { Router } from '@reach/router'

import ViewArticle from '../templates/ContentView'

export default function ContentPreview() {
  return (
    <Router>
      <ViewArticle path="/content-preview/:slug" />
    </Router>
  )
}
