import React from 'react'
import { Auth } from 'aws-amplify'
import { navigate } from 'gatsby'
import T from 'prop-types'

const HASURA_CLAIMS_NAMESPACE = 'https://hasura.io/jwt/claims'
const HASURA_ALLOWED_ROLES_KEY = 'x-hasura-allowed-roles'

const isBrowser = typeof window !== `undefined`

export default function ProtectedRoute({
  role,
  component: Component,
  ...props
}) {
  const user = Auth.user

  if (!user) {
    if (isBrowser) navigate('/')
    return null
  }

  if (role) {
    const tokenPayload = user.signInUserSession.idToken.payload
    const hasuraClaims = JSON.parse(tokenPayload[HASURA_CLAIMS_NAMESPACE])
    const userRoles = hasuraClaims[HASURA_ALLOWED_ROLES_KEY]

    if (!userRoles.includes(role)) {
      if (isBrowser) navigate('/')
      return null
    }
  }

  return <Component {...props} />
}

ProtectedRoute.propTypes = {
  role: T.string,
  component: T.elementType.isRequired,
}
