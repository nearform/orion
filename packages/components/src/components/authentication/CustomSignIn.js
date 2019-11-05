import React from 'react'
import { Redirect } from '@reach/router'
import { SignIn } from 'aws-amplify-react'
import { Grid, withStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import SectionTitle from '../page/SectionTitle'
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

  setState(state) {
    // aws-amplify sometimes sends a state update after the component has unmounted
    // (e.g. after a signin following a signup); check if still mounted before
    // handling to avoid warnings in console.
    if (this.mounted) {
      super.setState(state)
    }
  }

  componentDidMount() {
    this.mounted = true
    this.autoLoginCheck()
  }

  componentDidUpdate() {
    this.autoLoginCheck()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  autoLoginCheck() {
    if (this.doAutoLogin) {
      this.doAutoLogin = false
      // The signIn() function expects a DOM event argument.
      super.signIn(new Event('dummy-event'))
    }
  }

  showComponent() {
    const {
      props: { authState, message },
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
        return <AutoSignInMessage />
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
        message={message}
      />
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  form: {
    margin: 'auto',
    maxWidth: 463,
  },
}

const AutoSignInMessage = withStyles(styles, { withTheme: true })(
  ({ theme, classes }) => (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.form}>
        <Grid item xs={8}>
          <SectionTitle gutterBottom barColor={theme.palette.secondary.main}>
            Almost there
          </SectionTitle>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          spacing={4}
          xs={10}
          wrap="nowrap"
        >
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
          <Grid item>You are being signed in</Grid>
        </Grid>
      </Grid>
    </div>
  )
)
