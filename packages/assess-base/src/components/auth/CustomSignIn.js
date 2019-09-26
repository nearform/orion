import React from 'react'
import { Redirect } from '@reach/router'
import { SignIn } from 'aws-amplify-react'
import { SectionTitle } from 'components'
import CircularProgress from '@material-ui/core/CircularProgress'

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

  componentDidMount() {
    this.autoLoginCheck()
  }

  componentDidUpdate() {
    this.autoLoginCheck()
  }

  autoLoginCheck() {
    if (this.doAutoLogin) {
      this.doAutoLogin = false
      // The signIn function expects a DOM event argument.
      super.signIn(new Event('dummy-event'))
    }
  }

  showComponent() {
    const {
      props: { authState },
      state: { loading },
    } = this

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
        // Schedule automatic login if not already loading (=> signing in)
        this.doAutoLogin = !loading
        // Return a placeholder message.
        return (
          <React.Fragment>
            <SectionTitle
              gutterBottom
              barColor="green" // TODO: Read colour from theme
            >
              You are being signed in...
            </SectionTitle>
            <CircularProgress />
          </React.Fragment>
        )
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
