import React from 'react'
import { ConfirmSignUp } from 'aws-amplify-react'

import RegisterConfirm from './RegisterConfirm'
import authEventMixin from './AuthEventMixin'
import authErrors from './AuthErrors'

export default class CustomConfirmSignUp extends authEventMixin(ConfirmSignUp) {
  authErrorCategories = authErrors.confirmSignUp

  constructor(props) {
    super(props)
    this._validAuthStates = ['confirmSignUp']
  }

  showComponent() {
    return (
      <RegisterConfirm
        goToSignIn={() => super.changeState('signIn')}
        confirm={event => {
          this.setSubmitting(true)
          super.confirm(event)
        }}
        resend={event => super.resend(event)}
        handleInput={this.handleInputChange}
        username={this.usernameFromAuthData()}
        message={this.props.message}
      />
    )
  }
}
