import React from 'react'

import { CustomAuthenticator } from 'components'

export default function Auth() {
  const messages = {
    confirmSignUp:
      'Thank you for registering. Please note that your profile has now to be validated and you need to be assigned to your assessment. This will be done asap in the next hours.',
  }
  return <CustomAuthenticator messages={messages} />
}
