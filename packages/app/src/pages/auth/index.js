import React from 'react'
import { Redirect } from '@reach/router'
import { Authenticator, Greetings } from 'aws-amplify-react'

import DisplayIfSignedIn from '../../components/DisplayIfSignedIn'

export default function Auth() {
  return (
    <Authenticator hide={[Greetings]}>
      <DisplayIfSignedIn>
        <Redirect to="/" noThrow />
      </DisplayIfSignedIn>
    </Authenticator>
  )
}
