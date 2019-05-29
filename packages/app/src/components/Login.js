import React from 'react'
import {
  Typography,
  withStyles,
  Grid,
  Button,
  TextField,
} from '@material-ui/core'

import SectionTitle from '../components/SectionTitle'

function Login({ theme, classes, signIn, goToSignUp, goToReset, handleInput }) {
  return (
    <div className={classes.root}>
      <div>
        <Grid container direction="column" spacing={theme.spacing.unit * 3}>
          <Grid item xs={9}>
            <SectionTitle gutterBottom barColor={theme.palette.secondary.main}>
              Sign in to your account
            </SectionTitle>
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              please enter your username
            </Typography>
            <TextField name="username" onChange={handleInput} fullWidth />
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              please enter your password
            </Typography>
            <TextField
              name="password"
              type="password"
              onChange={handleInput}
              fullWidth
            />
          </Grid>
          <Grid
            item
            container
            alignItems="baseline"
            spacing={theme.spacing.unit}
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
            spacing={theme.spacing.unit}
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

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
}

export default withStyles(styles, { withTheme: true })(Login)
