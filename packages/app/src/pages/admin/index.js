import React from 'react'
import { Router } from '@reach/router'
import { Authenticator, Greetings } from 'aws-amplify-react'

import ProtectedRoute from '../../components/ProtectedRoute'
import AdminRoute from '../../components/AdminRoute'
import DisplayIfSignedIn from '../../components/DisplayIfSignedIn'

export default function Admin() {
  return (
    <Authenticator hide={[Greetings]}>
      <DisplayIfSignedIn>
        <Router basepath="/admin">
          <ProtectedRoute allowedRole="admin" component={AdminRoute} path="*" />
        </Router>
      </DisplayIfSignedIn>
    </Authenticator>
  )
}
