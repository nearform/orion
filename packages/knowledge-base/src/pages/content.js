import React from 'react'
import { Router } from '@reach/router'

import ViewArticle from '../components/content/ViewArticle'

export default function Content() {
  return (
    <Router>
      <ViewArticle path="/content/:slug" />
    </Router>
  )
}
