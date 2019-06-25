import React from 'react'
import T from 'prop-types'
import {
  Typography,
  withStyles,
  Grid,
  Button,
  TextField,
} from '@material-ui/core'

import { SectionTitle } from 'components'

function PasswordResetSend({ theme, classes, send, goToSignIn, handleInput }) {
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
              Email *
            </Typography>
            <TextField
              required
              name="username"
              type="email"
              onChange={handleInput}
              fullWidth
            />
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
              <Button
                name="submit"
                color="secondary"
                variant="contained"
                fullWidth
                onClick={send}
              >
                Send Code
              </Button>
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
