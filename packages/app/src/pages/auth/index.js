import React from 'react'
import { Redirect } from '@reach/router'
import { Authenticator, Greetings } from 'aws-amplify-react'

import DisplayIfSignedIn from '../../components/DisplayIfSignedIn'

export default function Auth() {
  return (
    <Authenticator
      hide={[Greetings]}
      signUpConfig={{
        hideAllDefaults: true,
        signUpFields: [
          {
            label: 'Email',
            key: 'username',
            required: true,
            placeholder: 'Email',
            type: 'email',
            displayOrder: 1,
          },
          {
            label: 'Password',
            key: 'password',
            required: true,
            placeholder: 'Password',
            type: 'password',
            displayOrder: 2,
          },
          {
            label: 'Type Of Organisation',
            key: 'orgType',
            required: true,
            custom: true,
            placeholder: 'Org Type',
            type: 'text',
            displayOrder: 3,
          },
          {
            label: 'Name Of Organisation',
            key: 'orgName',
            required: true,
            custom: true,
            placeholder: 'Org Name',
            type: 'text',
            displayOrder: 4,
          },
          {
            label: 'Country',
            key: 'country',
            required: true,
            custom: true,
            placeholder: 'Country',
            type: 'text',
            displayOrder: 5,
          },
        ],
      }}
    >
      <DisplayIfSignedIn>
        <Redirect to="/" noThrow />
      </DisplayIfSignedIn>
    </Authenticator>
  )
}
