import React, { useState } from 'react'
import { Auth } from 'aws-amplify'

import { Grid, Button, Typography } from '@material-ui/core'

import { Form } from 'gatsby-plugin-orion-core'

const UserLogin = ({ setAuthStage }) => {
  const [errors, setErrors] = useState()
  const handleLogin = ({ username, password }) => {
    Auth.signIn({ username, password })
      .then(() => {
        setAuthStage('loggedIn')
      })
      .catch(error =>
        setErrors(`${error.code} ${error.name}: ${error.message}`)
      )
  }

  return (
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
        <>
          <div>{errors}</div>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            {...props}
          >
            <Grid>
              <Typography noWrap variant="h6" color="textSecondary">
                No account?
                <Button onClick={() => setAuthStage('register')}>
                  Create account
                </Button>
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
        </>
      )}
      onSubmit={handleLogin}
    />
  )
}

export default UserLogin
