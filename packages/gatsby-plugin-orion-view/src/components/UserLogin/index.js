import React from 'react'
import { Redirect } from '@reach/router'
import { Grid, Button, Typography } from '@material-ui/core'
import { Auth } from 'aws-amplify'

import { Form } from 'gatsby-plugin-orion-core'

const handleLogin = ({ username, password }) => {
  /* eslint-disable no-console */
  Auth.signIn({ username, password })
    .then(data => console.log(data))
    .catch(error => console.log(error))
  return <Redirect noThrow to="/" />
  /* eslint-enable no-console */
}

const UserLogin = () => (
  <Form
    formFields={[
      {
        label: 'Please enter your username',
        name: 'username',
        type: 'email',
        xs: 12,
      },
      {
        label: 'Please enter your password',
        name: 'password',
        type: 'password',
        xs: 12,
      },
    ]}
    title={<Typography variant="h3">Sign in to your account</Typography>}
    SubmitComponent={({ disabled, ...props }) => (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        {...props}
      >
        <Grid>
          <Typography noWrap variant="h6" color="textSecondary">
            No account? <a href="/registration">Create account</a>
          </Typography>
        </Grid>
        <Grid>&nbsp;</Grid>
        <Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={disabled}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    )}
    onSubmit={handleLogin}
  />
)

export default UserLogin
