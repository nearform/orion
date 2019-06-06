import React from 'react'
import T from 'prop-types'
import {
  Typography,
  withStyles,
  Grid,
  Button,
  TextField,
} from '@material-ui/core'

import SectionTitle from '../SectionTitle'

function PasswordReset({ theme, classes, submit, resendCode, handleInput }) {
  return (
    <div className={classes.root}>
      <div>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={9}>
            <SectionTitle gutterBottom barColor={theme.palette.secondary.main}>
              Reset your password
            </SectionTitle>
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Code *
            </Typography>
            <TextField required name="code" onChange={handleInput} fullWidth />
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              New Password *
            </Typography>
            <TextField
              required
              name="password"
              type="password"
              onChange={handleInput}
              fullWidth
            />
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
              <Button
                name="submit"
                color="secondary"
                variant="contained"
                fullWidth
                onClick={submit}
              >
                Submit
              </Button>
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
