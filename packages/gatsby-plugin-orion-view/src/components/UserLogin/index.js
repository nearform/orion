import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'

import { Form } from 'gatsby-plugin-orion-core'

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
    submitButtonText="Sign in"
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
            No account? <a>Create account</a>
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
    // TODO: change below to handle sign in
    // eslint-disable-next-line no-alert
    onSubmit={e => alert(JSON.stringify(e, null, 2))}
  />
)

export default UserLogin
