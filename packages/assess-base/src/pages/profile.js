import React from 'react'
import { Router } from '@reach/router'

import ProfileView from '../templates/ProfileView'

export default function Profile() {
  return (
    <Router>
      <ProfileView path="/profile/*" />
    </Router>
  )
}
