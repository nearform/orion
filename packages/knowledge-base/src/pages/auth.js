import React from 'react'
import T from 'prop-types'
import { Redirect } from '@reach/router'
import {
  Authenticator,
  Greetings,
  SignIn,
  SignUp,
  ConfirmSignUp,
  ForgotPassword,
} from 'aws-amplify-react'

import CustomSignIn from '../components/auth/CustomSignIn'
import CustomSignUp from '../components/auth/CustomSignUp'
import CustomConfirmSignUp from '../components/auth/CustomConfirmSignUp'
import CustomForgotPassword from '../components/auth/CustomForgotPassword'
import { PaddedContainer } from 'components'
//TODO: handle all auth states
// X signIn
// X signUp
// - confirmSignIn
// X confirmSignUp
// - forgotPassword
// X verifyContact
// X signedIn
// X/- signedUp - added it to DisplayIfSignedIn so redirects to homepage, probably needs something better

import DisplayIfSignedIn from '../components/DisplayIfSignedIn'

function Auth({ location }) {
  const showRegister = location.pathname === '/auth/register'

  return (
    <PaddedContainer>
      <Authenticator
        hide={[Greetings, SignIn, SignUp, ConfirmSignUp, ForgotPassword]}
        theme={{ container: { flex: 1, display: 'flex' } }}
      >
        <CustomSignIn showRegister={showRegister} />
        <CustomSignUp override="SignUp" />
        <CustomConfirmSignUp override="ConfirmSignUp" />
        <CustomForgotPassword override="ForgotPassword" />
        <DisplayIfSignedIn>
          <Redirect to="/" noThrow />
        </DisplayIfSignedIn>
      </Authenticator>
    </PaddedContainer>
  )
}

Auth.propTypes = {
  location: T.object.isRequired,
}

export default Auth
