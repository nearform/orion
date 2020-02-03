import T from 'prop-types'
import get from 'lodash/get'
import * as colors from '@material-ui/core/colors'

const validColors = Object.keys(colors)
  .filter(c => Boolean(colors[c][500]))
  .map(c => colors[c][500])

function djb2(str = '') {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i) /* Hash * 33 + c */
  }

  return hash
}

function _placeholderEtoN(email) {
  return email === null
    ? ''
    : email
        .split('@')[0]
        .split('.')
        .map(n => n.charAt(0).toUpperCase() + n.slice(1))
        .join(' ')
}

function getColorFromEmail(email) {
  return validColors[
    ((djb2(email) % validColors.length) + validColors.length) %
      validColors.length
  ]
}

function getEmail(user) {
  return user.email || get(user, 'signupRequest.userAttributes.email')
}

function getInitials(name = '') {
  return name.split(' ').reduce((result, part, i) => {
    if (i < 2) {
      result += part.charAt(0).toUpperCase()
    }

    return result
  }, '')
}

function getFullName(firstName, lastName, email) {
  let fullName = ''
  if (firstName) {
    fullName = firstName + (lastName ? ' ' : '')
  }

  if (lastName) fullName += lastName

  return fullName || _placeholderEtoN(email)
}

const userPropTypes = {
  email: T.string.isRequired,
  firstName: T.string,
  lastName: T.string,
  avatar: T.string,
}

export { getColorFromEmail, getEmail, getInitials, getFullName, userPropTypes }
