import { useEffect, useState } from 'react'
import { Auth, Hub } from 'aws-amplify'

const isBrowser = typeof window !== 'undefined'
const HASURA_CLAIMS_NAMESPACE = 'https://hasura.io/jwt/claims'
const HASURA_ALLOWED_ROLES_KEY = 'x-hasura-allowed-roles'
const HASURA_USER_ID = 'x-hasura-user-id'
const ADMIN_ROLE = 'admin'

const isAuthenticated = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()

    return isBrowser && !!user
  } catch (err) {
    return false
  }
}
export const isAuthenticatedSync = () => isBrowser && !!Auth.user

const isAdmin = async () => (await getUserRoles()).includes(ADMIN_ROLE)
export const isAdminSync = () => getUserRolesSync().includes(ADMIN_ROLE)

export const getUserRolesSync = () => {
  if (!isAuthenticatedSync()) return []

  try {
    return extractUserRolesFromTokenPayload()
  } catch (err) {
    return []
  }
}

export const getUserIdSync = () => {
  if (!isAuthenticatedSync()) return null

  try {
    return extractUserIdFromTokenPayload()
  } catch (err) {
    return null
  }
}

function extractUserRolesFromTokenPayload() {
  const hasuraClaims = extractHasuraClaimsFromTokenPayload()
  return hasuraClaims[HASURA_ALLOWED_ROLES_KEY]
}

function extractUserIdFromTokenPayload() {
  const hasuraClaims = extractHasuraClaimsFromTokenPayload()
  return hasuraClaims[HASURA_USER_ID]
}

function extractHasuraClaimsFromTokenPayload() {
  const tokenPayload = Auth.user.signInUserSession.idToken.payload
  return JSON.parse(tokenPayload[HASURA_CLAIMS_NAMESPACE])
}

async function getUserRoles() {
  if (!(await isAuthenticated())) return []

  try {
    return extractUserRolesFromTokenPayload()
  } catch (err) {
    return []
  }
}

export function useUserRoles() {
  return useAuthState(getUserRolesSync(), getUserRoles)
}

export function useIsAdmin() {
  return useAuthState(isAdminSync(), isAdmin)
}

export function useIsAuthenticated() {
  return useAuthState(isAuthenticatedSync(), isAuthenticated)
}

function useAuthState(initialState, asyncStateGetter) {
  async function checkState() {
    setState(await asyncStateGetter())
  }

  const [state, setState] = useState(initialState)

  useEffect(() => {
    checkState()
  }, [asyncStateGetter])

  useAmplifyEvent('auth', checkState)

  return state
}

function useAmplifyEvent(channel, handler) {
  useEffect(() => {
    Hub.listen(channel, handler)
    return () => Hub.remove(channel, handler)
  }, [channel, handler])
}
