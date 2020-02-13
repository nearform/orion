import React, { useContext } from 'react'
import T from 'prop-types'
import { withStyles, Grid, Button } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import { AuthFormStateContext } from './AuthEventMixin'

import { SectionTitleField, InputField, SubmitButton } from './FormFields'

function RegisterConfirm({
  theme,
  classes,
  confirm,
  goToSignIn,
  handleInput,
  username,
  message,
  resend,
}) {
  const { resending } = useContext(AuthFormStateContext)
  return (
    <div className={classes.root}>
      <div>
        <Grid container direction="column" justify="center" spacing={3}>
          <Grid item xs={8}>
            <SectionTitleField
              barColor={theme.palette.secondary.main}
              category="general"
            >
              Confirm new Account
            </SectionTitleField>
          </Grid>
          {message && (
            <Grid item xs={8}>
              <div className={classes.message}>
                <p>{message}</p>
              </div>
            </Grid>
          )}
          <Grid item xs={8}>
            <div className={classes.message}>
              <div>
                <p>
                  <EmailIcon color="secondary" />
                </p>
              </div>
              <div>
                <p>
                  An email has been sent to you{username && ` at ${username}`}.
                </p>
                <p>
                  In the email you will find a code that will activate your
                  account.
                </p>
                <p>
                  <span>This code will expire after 24 hours</span>
                </p>
                {resending ? (
                  <p>Your confirmation code has been resent.</p>
                ) : (
                  <p>
                    <Button
                      data-testid="login-submit"
                      color="secondary"
                      size="small"
                      onClick={resend}
                    >
                      Resend Code
                    </Button>
                  </p>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={8}>
            <InputField
              required
              name="username"
              type="email"
              disabled={!username}
              value={username === null ? undefined : username}
              onChange={handleInput}
            >
              Email
            </InputField>
          </Grid>
          <Grid item xs={5}>
            <InputField
              required
              name="code"
              onChange={handleInput}
              onEnterKey={confirm}
            >
              Enter your code
            </InputField>
          </Grid>

          <Grid item container alignItems="baseline" spacing={3} wrap="nowrap">
            <Grid item>
              <Button color="secondary" size="small" onClick={goToSignIn}>
                Back to sign in
              </Button>
            </Grid>

            <Grid item xs={2}>
              &nbsp;
            </Grid>
            <Grid item>
              <SubmitButton onClick={confirm}>Confirm</SubmitButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

RegisterConfirm.propTypes = {
  theme: T.object.isRequired,
  classes: T.object.isRequired,
  confirm: T.func.isRequired,
  goToSignIn: T.func.isRequired,
  handleInput: T.func.isRequired,
  username: T.string,
  message: T.string,
  resend: T.func.isRequired,
}

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  message: {
    borderRadius: '4px',
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.background.light,
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '7px',
    display: 'flex',
    flexDirection: 'row',
    '& div': {
      padding: '0 7px',
    },
  },
  resend: {
    marginRight: '20px;',
  },
})

export default withStyles(styles, { withTheme: true })(RegisterConfirm)
