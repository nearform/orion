import React, { useState } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { Auth } from 'gatsby-plugin-orion-core/src/utils/amplify'
import { formFields } from './utils/form-fields'

import { Form } from 'gatsby-plugin-orion-core'

const UserRegistration = ({ setAuthStage, setUsername }) => {
  const [errors, setErrors] = useState()
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
    })
      .then(() => {
        setUsername(username)
        setAuthStage('confirm')
      })
      .catch(error =>
        setErrors(`${error.code} ${error.name}: ${error.message}`)
      )
  }

  return (
    <Form
      formFields={formFields}
      title={<Typography variant="h3">Create a new account</Typography>}
      SubmitComponent={({ disabled, ...props }) => (
        <>
          <div>{errors}</div>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={1}
            {...props}
          >
            <Grid>
              <Typography noWrap variant="h6" color="textSecondary">
                Have an account?
                <Button onClick={() => setAuthStage('login')}>Sign in</Button>
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
        </>
      )}
      onSubmit={handleRegister}
    />
  )
}

export default UserRegistration
