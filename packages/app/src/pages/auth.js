import React from 'react'
import { Redirect } from '@reach/router'
import {
  Authenticator,
  Greetings,
  SignIn,
  SignUp,
  ConfirmSignUp,
} from 'aws-amplify-react'

import CustomSignIn from '../components/CustomSignIn'
import CustomSignUp from '../components/CustomSignUp'
import CustomConfirmSignUp from '../components/CustomConfirmSignUp'

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
const AlwaysOn = props => {
  return (
    <div style={{ position: 'absolute', top: 0 }}>
      <div>I am always here to show current auth state: {props.authState}</div>
      <button onClick={() => props.onStateChange('confirmSignUp')}>
        Show Sign Up
      </button>
    </div>
  )
}
export default function Auth() {
  return (
    <Authenticator
      hide={[Greetings, SignIn, SignUp, ConfirmSignUp]}
      theme={{ container: { flex: 1, display: 'flex' } }}
    >
      <CustomSignIn />
      <CustomSignUp override={'SignUp'} />
      <CustomConfirmSignUp override={'ConfirmSignUp'} />
      <AlwaysOn />
      <DisplayIfSignedIn>
        <Redirect to="/" noThrow />
      </DisplayIfSignedIn>
    </Authenticator>
  )
}
