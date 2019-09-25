import React from 'react'

// This context object provides a way to share auth data across multiple
// different authentication forms. It is mainly used to enable automatic
// login after signup, by recording the username + password from the
// signup form, and using the recorded credentials to login after signup.

function setAuthData(state, data) {
  //console.log('setAuthData', state, data)
  if (typeof data === 'object') {
    //console.log('Setting authData:', data)
    context.authData = data
  } else if (state === 'signedIn') {
    // Delete auth data after sign in.
    context.authData = null
  }
}

const context = {
  authData: {},
  setAuthData,
}

const AuthDataContext = React.createContext(context)

export default AuthDataContext
