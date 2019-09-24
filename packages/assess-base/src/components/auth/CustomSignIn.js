import React from 'react'
import { SignIn } from 'aws-amplify-react'

import Login from './Login'
import authEventMixin from './AuthEventMixin'
import authErrors from './AuthErrors'

export default class CustomSignIn extends authEventMixin(SignIn) {
  authErrorCategories = authErrors.signIn

  constructor(props) {
    super(props)
    this._validAuthStates = ['signIn']
  }

  showComponent() {
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
