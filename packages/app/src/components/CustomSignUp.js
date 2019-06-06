import React from 'react'
import { SignUp } from 'aws-amplify-react'
import Register from './Register'

export default class CustomSignUp extends SignUp {
  constructor(props) {
    super(props)
    //required by the amplify SignUp component
    this.signUpFields = [
      {
        label: 'Email',
        key: 'username',
        required: true,
        placeholder: 'Email',
        type: 'email',
        displayOrder: 1,
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        placeholder: 'Password',
        type: 'password',
        displayOrder: 2,
      },
      {
        label: 'Type Of Organisation',
        key: 'orgType',
        required: true,
        custom: true,
        placeholder: 'Org Type',
        type: 'select',
        options: ['partner', 'member', 'non-member'],
        displayOrder: 3,
      },
      {
        label: 'Name Of Organisation',
        key: 'orgName',
        required: true,
        custom: true,
        placeholder: 'Org Name',
        type: 'text',
        displayOrder: 4,
      },
      {
        label: 'Country',
        key: 'country',
        required: true,
        custom: true,
        placeholder: 'Country',
        type: 'text',
        displayOrder: 5,
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
