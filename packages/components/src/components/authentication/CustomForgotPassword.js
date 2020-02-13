import React from 'react'
import { ForgotPassword } from 'aws-amplify-react'

import PasswordResetSend from './PasswordResetSend'
import PasswordResetConfirm from './PasswordResetConfirm'
import authEventMixin from './AuthEventMixin'
import authErrors from './AuthErrors'

export default class CustomForgotPassword extends authEventMixin(
  ForgotPassword
) {
  authErrorCategories = authErrors.forgotPassword

  constructor(props) {
    super(props)
    this._validAuthStates = ['forgotPassword']
  }

  showComponent() {
    const {
      state: { delivery },
      props: { authData = {} },
      handleInputChange,
    } = this
    if (delivery || authData.username) {
      return (
        <PasswordResetConfirm
          resendCode={event => super.send(event)}
          submit={event => {
            // Trim non-numeric chars from code.
            const { inputs } = this
            inputs.code = inputs.code.replace(/[^\d]/g, '')
            // Continue with submit.
            this.setSubmitting(true)
            super.submit(event)
          }}
          handleInput={handleInputChange}
        />
      )
    }

    return (
      <PasswordResetSend
        goToSignIn={() => super.changeState('signIn')}
        send={event => super.send(event)}
        handleInput={handleInputChange}
        message={this.props.message}
      />
    )
  }
}
