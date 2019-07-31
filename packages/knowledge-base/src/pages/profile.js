import React from 'react'
import { Router } from '@reach/router'

import ProfileView from '../components/profile'

export default function Profile() {
  return (
    <Router>
      <ProfileView path="/profile/:id" />
    </Router>
  )
}
