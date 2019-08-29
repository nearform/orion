import React from 'react'
import { Router } from '@reach/router'

import ViewArticle from '../templates/ContentView'

export default function Content() {
  return (
    <Router>
      <ViewArticle path="/content/:slug" />
    </Router>
  )
}
