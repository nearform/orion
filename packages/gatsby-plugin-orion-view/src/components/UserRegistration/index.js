import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { Auth } from 'aws-amplify'

import { Form } from 'gatsby-plugin-orion-core'

const handleRegister = ({ username, password, givenName }) => {
  Auth.signUp({
    username,
    password,
    attributes: {
      email: username,
      // AWS expects an underscore-separated variable, so must disable camelcase check
      // eslint-disable-next-line camelcase
      given_name: givenName,
    },
  }).then(({ username, password }) => {
    Auth.signIn({ username, password })
  })
}

const UserRegistration = () => (
  <Form
    formFields={[
      {
        label: 'Given name',
        name: 'givenName',
        type: 'text',
        xs: 12,
      },
      {
        label: 'Email',
        name: 'username',
        required: true,
        type: 'email',
        xs: 12,
      },
      {
        label: 'Password',
        name: 'password',
        required: true,
        type: 'password',
        xs: 12,
        helperText:
          'Must include an uppercase character, a number and a symbol',
        validate: value => {
          let error

          if (!value) {
            error = 'Required'
          } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Z\d@$!%*#?&]{1,}$/i.test(
              value
            )
          ) {
            error = 'Invalid Password'
          }

          return error
        },
      },
    ]}
    title={<Typography variant="h3">Create a new account</Typography>}
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
            Have an account? <a href="/login">Sign in</a>
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
            Create account
          </Button>
        </Grid>
      </Grid>
    )}
    onSubmit={handleRegister}
  />
)

export default UserRegistration
