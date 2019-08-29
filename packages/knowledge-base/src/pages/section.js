import React from 'react'
import { Router } from '@reach/router'

import ContentListView from '../templates/ContentListView'

export default function Section() {
  return (
    <Router>
      <ContentListView path="/section/:taxonomy" />
    </Router>
  )
}
