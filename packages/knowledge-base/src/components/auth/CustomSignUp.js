import React from 'react'
import { SignUp } from 'aws-amplify-react'
import Register from './Register'

export default class CustomSignUp extends SignUp {
  constructor(props) {
    super(props)
    //required by the amplify SignUp component
    this.signUpFields = [
      {
        label: 'First Name',
        key: 'firstname',
        required: true,
        type: 'text',
        xs: 5,
      },
      {
        label: 'Last Name',
        key: 'lastname',
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

  showComponent() {
    return (
      <Register
        goToSignIn={() => super.changeState('signIn')}
        signUp={event => super.signUp(event)}
        handleInput={this.handleInputChange}
        signUpFields={this.signUpFields}
      />
    )
  }
}
