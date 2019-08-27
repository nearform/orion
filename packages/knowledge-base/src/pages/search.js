import React from 'react'
import { Router } from '@reach/router'

import ContentListView from '../templates/ContentListView'

export default function Content() {
  return (
    <Router>
      <ContentListView path="/search/:term" />
    </Router>
  )
}
