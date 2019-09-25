import React from 'react'
import {
  Authenticator,
  Greetings,
  SignIn,
  SignUp,
  ConfirmSignUp,
  ForgotPassword,
} from 'aws-amplify-react'

import AuthDataContext from '../components/auth/AuthDataContext'
import CustomSignIn from '../components/auth/CustomSignIn'
import CustomSignUp from '../components/auth/CustomSignUp'
import CustomConfirmSignUp from '../components/auth/CustomConfirmSignUp'
import CustomForgotPassword from '../components/auth/CustomForgotPassword'

export default function Auth() {
  return (
    <AuthDataContext.Provider>
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
