import { useEffect, useState, createContext } from 'react'
import { Auth, Hub } from 'aws-amplify'

const isBrowser = typeof window !== 'undefined'
const HASURA_CLAIMS_NAMESPACE = 'https://hasura.io/jwt/claims'
const CUSTOM_CLAIMS_NAMESPACE = 'x-raw-salmon-claims'
const CUSTOM_CLAIMS_CONTRIBUTOR_KEY = 'x-assess-base-contributor'
const CUSTOM_CLAIMS_ASSESSOR_KEY = 'x-assess-base-assessor'
const HASURA_ALLOWED_ROLES_KEY = 'x-hasura-allowed-roles'
const HASURA_USER_ID = 'x-hasura-user-id'
const HASURA_GROUP_ID = 'x-hasura-group-id'
const ADMIN_ROLES_REGEX = /admin$/i

export const AuthInitContext = createContext(false)

const isAuthenticated = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    return isBrowser && !!user
  } catch (err) {
    return false
  }
}

export const isAuthenticatedSync = () => isBrowser && !!Auth.user

const isAdmin = async () =>
  (await getUserRoles()).some(role => ADMIN_ROLES_REGEX.test(role))
export const isAdminSync = () =>
  getUserRolesSync().some(role => ADMIN_ROLES_REGEX.test(role))

export const isContributorSync = () =>
  !!getCustomClaimsSync()[CUSTOM_CLAIMS_CONTRIBUTOR_KEY]
export const isAssessorSync = () =>
  !!getCustomClaimsSync()[CUSTOM_CLAIMS_ASSESSOR_KEY]

export const getUserRolesSync = () => {
  if (!isAuthenticatedSync()) return []
  try {
    return extractUserRolesFromTokenPayload()
  } catch (err) {
    return []
  }
}

export const getCustomClaimsSync = () => {
  if (!isAuthenticatedSync()) return {}

  return extractCustomClaimsFromTokenPayload()
}

export const getUserIdSync = () => {
  if (!isAuthenticatedSync()) return null

  try {
    return extractUserIdFromTokenPayload()
  } catch (err) {
    return null
  }
}

export const getUserGroupIdSync = () => {
  if (!isAuthenticatedSync()) return null

  try {
    return extractGroupIdFromTokenPayload()
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
function extractGroupIdFromTokenPayload() {
  const hasuraClaims = extractHasuraClaimsFromTokenPayload()
  return hasuraClaims[HASURA_GROUP_ID]
}
function extractHasuraClaimsFromTokenPayload() {
  const tokenPayload = Auth.user.signInUserSession.idToken.payload
  return JSON.parse(tokenPayload[HASURA_CLAIMS_NAMESPACE])
}

function extractCustomClaimsFromTokenPayload() {
  const tokenPayload = Auth.user.signInUserSession.idToken.payload

  try {
    return JSON.parse(tokenPayload[CUSTOM_CLAIMS_NAMESPACE])
  } catch (err) {
    return {}
  }
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
