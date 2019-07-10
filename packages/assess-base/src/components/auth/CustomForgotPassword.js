import React from 'react'
import { ForgotPassword } from 'aws-amplify-react'

import PasswordResetSend from './PasswordResetSend'
import PasswordResetConfirm from './PasswordResetConfirm'
export default class CustomForgotPassword extends ForgotPassword {
  constructor(props) {
    super(props)
    this._validAuthStates = ['forgotPassword']
  }

  showComponent() {
    const { authData = {} } = this.props
    if (this.state.delivery || authData.username) {
      return (
        <PasswordResetConfirm
          resendCode={() => super.send(event)}
          submit={event => super.submit(event)}
          handleInput={this.handleInputChange}
        />
      )
    } else {
      return (
        <PasswordResetSend
          goToSignIn={() => super.changeState('signIn')}
          send={event => super.send(event)}
          handleInput={this.handleInputChange}
        />
      )
    }
  }
}
