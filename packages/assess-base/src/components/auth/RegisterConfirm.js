import React from 'react'
import T from 'prop-types'
import { withStyles, Grid, Button } from '@material-ui/core'

import { SectionTitleField, InputField, SubmitButton } from './FormFields'

function RegisterConfirm({
  theme,
  classes,
  confirm,
  goToSignIn,
  handleInput,
  username,
}) {
  return (
    <div className={classes.root}>
      <div>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={9}>
            <SectionTitleField
              barColor={theme.palette.secondary.main}
              category="general"
            >
              Confirm new Account
            </SectionTitleField>
          </Grid>
          <Grid item>
            <InputField
              name="username"
              type="email"
              required
              disabled={!username}
              value={username !== null ? username : undefined}
              onChange={handleInput}
            >
              Email
            </InputField>
          </Grid>
          <Grid item>
            <InputField name="code" required onChange={handleInput}>
              Enter your code
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
}

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
}

export default withStyles(styles, { withTheme: true })(RegisterConfirm)
