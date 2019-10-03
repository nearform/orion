import React, { useState } from 'react'
import {
  Authenticator,
  Greetings,
  SignIn,
  SignUp,
  ConfirmSignUp,
  ForgotPassword,
} from 'aws-amplify-react'

import AuthDataContext from './AuthDataContext'
import CustomSignIn from './CustomSignIn'
import CustomSignUp from './CustomSignUp'
import CustomConfirmSignUp from './CustomConfirmSignUp'
import CustomForgotPassword from './CustomForgotPassword'

export default function CustomAuthenticator() {
  const [authData, _setAuthData] = useState({})
  const setAuthData = (state, data) => {
    if (state == 'confirmSignUp') {
      _setAuthData(data)
    }
  }
  return (
    <AuthDataContext.Provider value={{ authData, setAuthData }}>
      <Authenticator
        hide={[Greetings, SignIn, SignUp, ConfirmSignUp, ForgotPassword]}
        theme={{ container: { flex: 1, display: 'flex' } }}
      >
        <CustomSignIn />
        <CustomSignUp override="SignUp" />
        <CustomConfirmSignUp override="ConfirmSignUp" />
        <CustomForgotPassword override="ForgotPassword" />
      </Authenticator>
    </AuthDataContext.Provider>
  )
}
