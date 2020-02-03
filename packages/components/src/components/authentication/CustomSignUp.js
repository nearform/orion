import React from 'react'
import { SignUp } from 'aws-amplify-react'

import Register from './Register'
import authEventMixin from './AuthEventMixin'
import authErrors from './AuthErrors'

export default class CustomSignUp extends authEventMixin(SignUp) {
  authErrorCategories = authErrors.signUp

  constructor(props) {
    super(props)
    // Required by the amplify SignUp component
    this.signUpFields = [
      {
        label: 'First Name',
        key: 'given_name',
        required: true,
        type: 'text',
        xs: 5,
      },
      {
        label: 'Last Name',
        key: 'family_name',
        required: true,
        type: 'text',
        xs: 5,
      },
      {
        label: 'Email',
        key: 'username',
        required: true,
        type: 'email',
        xs: 10,
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        type: 'password',
        xs: 10,
        helperText:
          'Must include an uppercase character, a number and a symbol',
      },
      {
        label: 'Type Of Organisation',
        key: 'orgType',
        required: true,
        custom: true,
        type: 'select',
        options: ['partner', 'member', 'non-member'],
        xs: 10,
      },
      {
        label: 'Name Of Organisation',
        key: 'orgName',
        required: true,
        custom: true,
        type: 'text',
        xs: 10,
      },
      {
        label: 'Country',
        key: 'country',
        required: true,
        custom: true,
        type: 'text',
        xs: 10,
      },
    ]
    this._validAuthStates = ['signUp']
  }

  changeState(state, data) {
    // Rewrite auth data to include username & password prior to signup confirmation.
    // This is needed by the CustomSignIn component so that it can do an automatic
    // signin after signup has completed.
    if (state === 'confirmSignUp') {
      const {
        inputs: { password },
      } = this
      data = { username: data, password }
    }

    super.changeState(state, data)
  }

  showComponent() {
    return (
      <Register
        goToSignIn={() => this.changeState('signIn')}
        signUp={event => {
          this.setSubmitting(true)
          this.signUp(event)
        }}
        handleInput={this.handleInputChange}
        signUpFields={this.signUpFields}
        message={this.props.message}
      />
    )
  }
}
