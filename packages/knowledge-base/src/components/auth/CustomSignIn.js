import React from 'react'
import T from 'prop-types'
import { SignIn } from 'aws-amplify-react'

import Login from './Login'

class CustomSignIn extends SignIn {
  constructor(props) {
    super(props)
    this._validAuthStates = ['signIn']
  }

  componentDidUpdate() {
    if (this.props.showRegister) {
      super.changeState('signUp')
    }
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

CustomSignIn.propTypes = {
  showRegister: T.bool,
}

export default CustomSignIn
