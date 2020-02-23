import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { Typography, Button } from '@material-ui/core'

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
      title={<Typography variant="h3">Create a new account</Typography>}
      submitButtonText="Create account"
      submitText={
        <Typography noWrap variant="h6" color="textSecondary">
          Have an account? <a>Sign in</a>
        </Typography>
      }
    />
  ))
  .add('Login Error', () => (
    <Form
      formFields={[
        {
          label: 'Please enter your username',
          key: 'username',
          type: 'email',
          xs: 12,
          error: 'This is an error!',
        },
        {
          label: 'Please enter your password',
          key: 'password',
          type: 'password',
          xs: 12,
        },
      ]}
      title={<Typography variant="h3">Sign in to your account</Typography>}
      submitButtonText="Sign in"
      submitText={
        <Typography noWrap variant="h6" color="textSecondary">
          No account? <a>Create account</a>
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
      title={<Typography variant="h3">Sign in to your account</Typography>}
      submitButtonText="Sign in"
      submitText={
        <Typography noWrap variant="h6" color="textSecondary">
          No account? <a>Create account</a>
        </Typography>
      }
      // eslint-disable-next-line no-console
      onSubmit={e => console.log(e)}
    />
  ))
  .add('Article Edit', () => (
    <Form
      formFields={[
        {
          label: 'Please enter your username',
          name: 'username',
          type: 'email',
          inputTypographyVariant: 'h1',
          xs: 6,
        },
        {
          label: 'Please enter your password',
          name: 'password',
          type: 'password',
          validate: v => (v.length < 5 ? 'Password too short' : null),
          xs: 6,
        },
        {
          label: 'Please enter your username',
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          validate: value => {
            let error

            if (!value) {
              error = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ) {
              error = 'Invalid email address'
            }

            return error
          },
          xs: 12,
        },
        {
          label: 'Please enter your password',
          name: 'name',
          type: 'password',
          validate: (value, values) =>
            value === values.password ? null : 'Passwords do not match',
          xs: 12,
        },
      ]}
      title={<Typography variant="h3">Sign in to your account</Typography>}
      submitButtonText="Sign in"
      submitText={
        <Typography noWrap variant="h6" color="textSecondary">
          No account? <a>Create account</a>
        </Typography>
      }
      SubmitComponent={props => (
        <Button type="submit" variant="contained" color="primary" {...props}>
          Custom Submit
        </Button>
      )}
      // eslint-disable-next-line no-alert
      onSubmit={e => alert(JSON.stringify(e, null, 2))}
    />
  ))
