import React from 'react'
import { Router } from '@reach/router'

import ContentListView from 'gatsby-plugin-orion-core/components/ContentListView'

export default function Content() {
  return (
    <Router>
      <ContentListView path="/search/:term" />
    </Router>
  )
}
