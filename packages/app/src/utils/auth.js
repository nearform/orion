import { Auth } from 'aws-amplify'

const isBrowser = typeof window !== `undefined`
const HASURA_CLAIMS_NAMESPACE = 'https://hasura.io/jwt/claims'
const HASURA_ALLOWED_ROLES_KEY = 'x-hasura-allowed-roles'
const ADMIN_ROLE = 'admin'

export const isAuthenticated = () => isBrowser && !!Auth.user

export function getUserRoles() {
  if (!isAuthenticated()) return []

  try {
    const tokenPayload = Auth.user.signInUserSession.idToken.payload
    const hasuraClaims = JSON.parse(tokenPayload[HASURA_CLAIMS_NAMESPACE])

    return hasuraClaims[HASURA_ALLOWED_ROLES_KEY]
  } catch (err) {
    return []
  }
}

export const isAdmin = () => getUserRoles().includes(ADMIN_ROLE)
