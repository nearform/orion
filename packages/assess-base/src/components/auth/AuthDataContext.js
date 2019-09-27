import React from 'react'

// This context object provides a way to share auth data across multiple
// different authentication forms. It is mainly used to enable automatic
// login after signup, by recording the username + password from the
// signup form, and using the recorded credentials to login after signup.

const AuthDataContext = React.createContext({})

export default AuthDataContext
