import React from 'react'
import { Router } from '@reach/router'

import ViewArticle from '../components/ViewArticle'

export default function Content() {
  return (
    <Router basepath="/content">
      <ViewArticle path=":contentId" />
    </Router>
  )
}
