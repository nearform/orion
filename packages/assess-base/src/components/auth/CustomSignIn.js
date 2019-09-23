import React from 'react'
import { SignIn } from 'aws-amplify-react'

import Login from './Login'
import authEventMixin from './AuthEventMixin'

export default class CustomSignIn extends authEventMixin(SignIn) {
  constructor(props) {
    super(props)
    this._validAuthStates = ['signIn']
  }

  showComponent() {
    return (
      <Login
        goToSignUp={() => super.changeState('signUp')}
        goToReset={() => super.changeState('forgotPassword')}
        signIn={event => super.signIn(event)}
        handleInput={this.handleInputChange}
      />
    )
  }
}
