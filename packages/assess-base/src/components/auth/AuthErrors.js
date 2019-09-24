function passwordValidationErrors(err) {
  if (/need to be filled.*password/i.test(err)) {
    return 'Password is required'
  }
  let r = /value at 'password' failed to satisfy constraint: member(.*)/i.exec(
    err
  )
  if (r) {
    return 'Password' + r[1]
  }
  r = /password (?:did|does) not conform with policy: (.*)/i.exec(err)
  if (r) {
    return r[1]
  }
}

const authErrors = {
  signIn: {
    username: error => /user/i.test(error),
    password: error => /password/i.test(error),
  },
  signUp: {
    given_name: err =>
      /need to be filled.*first name/i.test(err) && 'First name is required',
    family_name: err =>
      /need to be filled.*last name/i.test(err) && 'Last name is required',
    username: err => {
      if (/need to be filled.*email/i.test(err)) {
        return 'Email is required'
      }
      return /username/i.test(err)
    },
    password: passwordValidationErrors,
    orgType: err =>
      /need to be filled.*type of org/i.test(err) &&
      'Type of organisation is required',
    orgName: err =>
      /need to be filled.*name of org/i.test(err) &&
      'Name of organisation is required',
    country: err =>
      /need to be filled.*country/i.test(err) && 'Country is required',
  },
  confirmSignup: {
    username: error => /user/i.test(error) && 'Email is required',
    code: error => /code/i.test(error),
  },
  forgotPassword: {
    username: error => /user/i.test(error) && 'Email is required',
    code: error => /code/i.test(error),
    password: error =>
      passwordValidationErrors(error) || /password/i.test(error),
  },
}

export default authErrors
