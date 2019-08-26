import {
  useEffect,
  useState,
  createContext,
  useCallback,
  useContext,
} from 'react'
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
const PUBLIC_ROLE_REGEX = /^public$/i
const PLATFORM_GROUP_REGEX = /^platform/i

export const AuthInitContext = createContext()

export const useIsAuthInitialized = () => {
  const context = useContext(AuthInitContext)
  if (context === undefined) {
    throw new Error(
      'useIsAuthInitialized must be used inside AuthInitContext.Provider'
    )
  }
  return context
}

export const useIsValidUser = () => {
  const isAuthInitialized = useIsAuthInitialized()
  const isAuthenticated = isAuthenticatedSync()
  return isAuthInitialized && isAuthenticated && !isPublicSync()
}

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

const isPlatformGroup = async () =>
  (await getUserRoles()).some(role => PLATFORM_GROUP_REGEX.test(role))
export const isPlatformGroupSync = () =>
  getUserRolesSync().some(role => PLATFORM_GROUP_REGEX.test(role))

const isPublicSync = () =>
  getUserRolesSync().some(role => PUBLIC_ROLE_REGEX.test(role))

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

async function getUserId() {
  if (!(await isAuthenticated())) return []

  try {
    return extractUserIdFromTokenPayload()
  } catch (err) {
    return []
  }
}

export function useUserId() {
  return Number(useAuthState(getUserIdSync(), getUserId))
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
export function useIsPlatformGroup() {
  return useAuthState(isPlatformGroupSync(), isPlatformGroup)
}

export function useIsAuthenticated() {
  return useAuthState(isAuthenticatedSync(), isAuthenticated)
}

function useAuthState(initialState, asyncStateGetter) {
  const [state, setState] = useState(initialState)
  const checkState = useCallback(
    async () => setState(await asyncStateGetter()),
    [asyncStateGetter]
  )

  useEffect(() => {
    checkState()
  }, [checkState])

  useAmplifyEvent('auth', checkState)

  return state
}

function useAmplifyEvent(channel, handler) {
  useEffect(() => {
    Hub.listen(channel, handler)
    return () => Hub.remove(channel, handler)
  }, [channel, handler])
}
