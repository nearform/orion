import React from 'react'
import T from 'prop-types'
import { withStyles, Grid, Button } from '@material-ui/core'

import { SectionTitleField, InputField, Submit } from './FormFields'

function PasswordResetSend({ theme, classes, send, goToSignIn, handleInput }) {
  return (
    <div className={classes.root}>
      <div>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={9}>
            <SectionTitleField
              barColor={theme.palette.secondary.main}
              category="general"
            >
              Reset your password
            </SectionTitleField>
          </Grid>
          <Grid item>
            <InputField
              name="username"
              type="email"
              required
              onChange={handleInput}
            >
              Email
            </InputField>
          </Grid>

          <Grid item container alignItems="baseline" spacing={3} wrap="nowrap">
            <Grid item>
              <Button color="secondary" onClick={goToSignIn} size="small">
                Back to sign in
              </Button>
            </Grid>

            <Grid item xs={2}>
              &nbsp;
            </Grid>
            <Grid item>
              <Submit onClick={send}>Send Code</Submit>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

PasswordResetSend.propTypes = {
  theme: T.object.isRequired,
  classes: T.object.isRequired,
  send: T.func.isRequired,
  goToSignIn: T.func.isRequired,
  handleInput: T.func.isRequired,
}

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
}

export default withStyles(styles, { withTheme: true })(PasswordResetSend)
