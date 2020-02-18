import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { Typography } from '@material-ui/core'

import Form from '.'

storiesOf('Form', module)
  .addDecorator(jsxDecorator)
  .add('Signup', () => (
    <Form
      formFields={[
        {
          label: 'First Name',
          key: 'given_name',
          required: true,
          type: 'text',
          xs: 6,
        },
        {
          label: 'Last Name',
          key: 'family_name',
          required: true,
          type: 'text',
          xs: 6,
        },
        {
          label: 'Email',
          key: 'username',
          required: true,
          type: 'email',
          xs: 12,
          error: 'This is an error',
        },
        {
          label: 'Password',
          key: 'password',
          required: true,
          type: 'password',
          xs: 12,
          helperText:
            'Must include an uppercase character, a number and a symbol',
        },
      ]}
      Title={<Typography variant="h3">Create a new account</Typography>}
      submitButtonText="Create account"
      submitText={
        <Typography noWrap variant="h6" color="textSecondary">
          Have an account? <a>Sign in</a>
        </Typography>
      }
    />
  ))
  .add('Login', () => (
    <Form
      formFields={[
        {
          label: 'Please enter your username',
          key: 'username',
          type: 'email',
          xs: 12,
        },
        {
          label: 'Please enter your password',
          key: 'password',
          type: 'password',
          xs: 12,
        },
      ]}
      Title={<Typography variant="h3">Sign in to your account</Typography>}
      submitButtonText="Sign in"
      submitText={
        <Typography noWrap variant="h6" color="textSecondary">
          No account? <a>Create account</a>
        </Typography>
      }
    />
  ))
