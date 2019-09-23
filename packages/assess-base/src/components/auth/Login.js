import React from 'react'
import T from 'prop-types'
import { Typography, withStyles, Grid, Button } from '@material-ui/core'

import { SectionTitleField, InputField } from './FormFields'

function Login({ theme, classes, signIn, goToSignUp, goToReset, handleInput }) {
  return (
    <div className={classes.root}>
      <div>
        <Grid container spacing={3} className={classes.form}>
          <Grid item xs={8}>
            <SectionTitleField
              barColor={theme.palette.secondary.main}
              category="general"
            >
              Sign in to your account
            </SectionTitleField>
          </Grid>
          <Grid item xs={10}>
            <InputField name="username" onChange={handleInput}>
              please enter your username
            </InputField>
          </Grid>
          <Grid item xs={10}>
            <InputField name="password" type="password" onChange={handleInput}>
              please enter your password
            </InputField>
          </Grid>
          <Grid
            item
            container
            alignItems="baseline"
            spacing={1}
            xs={10}
            wrap="nowrap"
          >
            <Grid item>
              <Typography variant="h4" color="textSecondary">
                Forget your password?
              </Typography>
            </Grid>
            <Grid item>
              <Button color="secondary" onClick={goToReset} size="small">
                Reset password
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems="baseline"
            spacing={1}
            xs={10}
            wrap="nowrap"
          >
            <Grid item>
              <Typography variant="h4" color="textSecondary" noWrap>
                No account?
              </Typography>
            </Grid>
            <Grid item>
              <Button color="secondary" onClick={goToSignUp} size="small">
                Create account
              </Button>
            </Grid>
            <Grid item xs={2}>
              &nbsp;
            </Grid>
            <Grid item>
              <Button
                name="submit"
                color="secondary"
                variant="contained"
                fullWidth
                onClick={signIn}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

Login.propTypes = {
  theme: T.object.isRequired,
  classes: T.object.isRequired,
  signIn: T.func.isRequired,
  goToSignUp: T.func.isRequired,
  goToReset: T.func.isRequired,
  handleInput: T.func.isRequired,
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

export default withStyles(styles, { withTheme: true })(Login)
