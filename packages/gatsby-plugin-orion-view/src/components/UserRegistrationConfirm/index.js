import React, { useState } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { Auth } from 'gatsby-plugin-orion-core/src/utils/amplify'

import { Form } from 'gatsby-plugin-orion-core'

const UserRegistrationConfirm = ({ setAuthStage, username }) => {
  const [errors, setErrors] = useState()
  const handleConfirm = ({ confirmCode }) => {
    Auth.confirmSignUp(username, confirmCode)
      .then(() => {
        setErrors(`Registration Successful. Please Login`)
        setAuthStage('login')
      })
      .catch(error =>
        setErrors(`${error.code} ${error.name}: ${error.message}`)
      )
  }

  return (
    <Form
      formFields={[
        {
          label: 'Confirmation Code',
          name: 'confirmCode',
          type: 'text',
          xs: 12,
        },
      ]}
      title={<Typography variant="h3">Confirm Your Account</Typography>}
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
            <Grid>&nbsp;</Grid>
            <Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={disabled}
              >
                Confirm account
              </Button>
            </Grid>
            <Grid>&nbsp;</Grid>
          </Grid>
        </>
      )}
      onSubmit={handleConfirm}
    />
  )
}

export default UserRegistrationConfirm
