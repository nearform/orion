import React from 'react'
import T from 'prop-types'
import { withStyles, Grid, Button } from '@material-ui/core'

import { SectionTitleField, InputField, SubmitButton } from './FormFields'

function PasswordReset({ theme, classes, submit, resendCode, handleInput }) {
  return (
    <div className={classes.root}>
      <div>
        <Grid container direction="column" justify="center" spacing={3}>
          <Grid item xs={9}>
            <SectionTitleField
              barColor={theme.palette.secondary.main}
              category="general"
            >
              Reset your password
            </SectionTitleField>
          </Grid>
          <Grid item>
            <InputField name="code" required onChange={handleInput}>
              Code
            </InputField>
          </Grid>
          <Grid item>
            <InputField
              name="password"
              type="password"
              required
              onChange={handleInput}
            >
              New Password
            </InputField>
          </Grid>

          <Grid item container alignItems="baseline" spacing={3} wrap="nowrap">
            <Grid item>
              <Button color="secondary" onClick={resendCode} size="small">
                Resend Code
              </Button>
            </Grid>

            <Grid item xs={2}>
              &nbsp;
            </Grid>
            <Grid item>
              <SubmitButton onClick={submit}>Submit</SubmitButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

PasswordReset.propTypes = {
  theme: T.object.isRequired,
  classes: T.object.isRequired,
  submit: T.func.isRequired,
  resendCode: T.func.isRequired,
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

export default withStyles(styles, { withTheme: true })(PasswordReset)
