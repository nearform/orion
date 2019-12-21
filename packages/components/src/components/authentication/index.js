import React, { useState } from 'react'
import T from 'prop-types'
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

export default function CustomAuthenticator({ messages = {} }) {
  const [authData, _setAuthData] = useState({})
  const setAuthData = (state, data) => {
    if (state == 'confirmSignUp') {
      _setAuthData(data)
    }
  }
  return (
    <AuthDataContext.Provider value={{ authData, setAuthData }}>
      {/* To test a specific form in the signup process without having to go
       ** through the process, use the Authenticator component's authState
       ** prop with the name of the state corresponding to the required form,
       ** e.g. authState="confirmSignUp" */}
      <Authenticator
        hide={[Greetings, SignIn, SignUp, ConfirmSignUp, ForgotPassword]}
        theme={{ container: { flex: 1, display: 'flex' } }}
      >
        <CustomSignIn message={messages.signIn} />
        <CustomSignUp message={messages.signUp} override="SignUp" />
        <CustomConfirmSignUp
          message={messages.confirmSignUp}
          override="ConfirmSignUp"
        />
        <CustomForgotPassword
          message={messages.forgotPassword}
          override="ForgotPassword"
        />
      </Authenticator>
    </AuthDataContext.Provider>
  )
}

CustomAuthenticator.propTypes = {
  messages: T.object,
}

export * from './graphql'
