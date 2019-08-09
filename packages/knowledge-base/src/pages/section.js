import React from 'react'
import { Router } from '@reach/router'

import ListContent from '../components/content/ListContent'

export default function Content() {
  return (
    <Router>
      <ListContent path="/section/:cat" />
    </Router>
  )
}
