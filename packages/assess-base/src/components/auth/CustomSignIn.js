import React from 'react'
import { Redirect } from '@reach/router'
import { SignIn } from 'aws-amplify-react'

import Login from './Login'
import authEventMixin from './AuthEventMixin'
import authErrors from './AuthErrors'
import AuthDataContext from './AuthDataContext'

export default class CustomSignIn extends authEventMixin(SignIn) {
  static contextType = AuthDataContext
  authErrorCategories = authErrors.signIn

  constructor(props) {
    super(props)
    this._validAuthStates = ['signIn', 'signedUp', 'signedIn']
  }

  showComponent() {
    const {
      props: { authState },
    } = this
    /*
    console.log('CustomSignIn authState=', authState)
    console.log('CustomSignIn context=', this.context)
    */

    // If user is signed in then redirect to home page.
    if (authState === 'signedIn') {
      return <Redirect to="/" noThrow />
    }

    // If user is just signed up then attempt an automatic login.
    if (authState === 'signedUp') {
      const {
        authData: { username, password },
      } = this.context
      if (username && password) {
        this.inputs.username = username
        this.inputs.password = password
        this.setSubmitting(true)
        super.signIn()
      }
    }

    return (
      <Login
        goToSignUp={() => super.changeState('signUp')}
        goToReset={() => super.changeState('forgotPassword')}
        signIn={event => {
          this.setSubmitting(true)
          super.signIn(event)
        }}
        handleInput={this.handleInputChange}
      />
    )
  }
}
