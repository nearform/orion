import Amplify, { Auth } from 'aws-amplify'
import awsConfig from './aws-exports'

Amplify.configure(awsConfig)

import { navigate } from '@reach/router'

export const checkIfAuthenticated = hostname => {
  if (hostname === 'localhost') {
    return true
  }

  Auth.currentAuthenticatedUser()
    .then(() => {
      return true
    })
    .catch(() => {
      // User not authorised so redirect to View where they can log in
      const hasCustomUrl =
        process.env.GATSBY_URL_VIEW !== undefined &&
        process.env.GATSBY_URL_VIEW.length > 0
      if (hasCustomUrl) {
        window.location.href = `${process.env.GATSBY_URL_VIEW}/login`
      } else {
        navigate('/default401')
      }
    })
}

export { Auth, Storage } from 'aws-amplify'
