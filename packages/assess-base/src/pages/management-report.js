import React from 'react'
import { Router } from '@reach/router'

import ManagementReport from '../templates/management-report'

export default function Content() {
  return (
    <Router>
      <ManagementReport path="/management-report/:assessmentId" />
    </Router>
  )
}
