export const formFields = [
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
    helperText: 'Must include an uppercase character, a number and a symbol',
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
]
