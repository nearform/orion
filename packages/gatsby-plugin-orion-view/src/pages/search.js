import React from 'react'
import { Router } from '@reach/router' // eslint-disable-line import/no-extraneous-dependencies

import ContentListView from '../components/ContentListView'

export default function Content() {
  return (
    <Router>
      <ContentListView path="/search/:term" />
    </Router>
  )
}
