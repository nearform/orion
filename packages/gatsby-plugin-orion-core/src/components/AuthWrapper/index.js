import React, { createContext, useState } from 'react'
import T from 'prop-types'
import { Auth } from 'aws-amplify'
import { find, get } from 'lodash'

const isBrowser = typeof window !== 'undefined'
const HASURA_CLAIMS_NAMESPACE = 'https://hasura.io/jwt/claims'
const CUSTOM_CLAIMS_NAMESPACE = 'x-orion-claims'
const HASURA_USER_ID = 'x-hasura-user-id'
const HASURA_GROUP_ID = 'x-hasura-group-id'

export const AuthContext = createContext({ isAuthInitialized: false })

const comparePerms = (userSet, reqString, divider) => {
  const reqSet = reqString.split(divider)
  const val = reqSet.reduce((acc, curr) =>
    userSet[curr] === true ? acc++ : acc
  )
  return divider === '&' ? val === reqSet.length : val > 0
}

// Use: checkPerms({user: 'create&read&update&delete', page: 'read|update' }, true)
const checkPerms = (permReqs, all = true) => {
  const user = {}
  const roles = {}
  let hasPerms = false
  if (user.role !== null && roles.keys(user.role)) {
    const userPerms = roles[user.role]
    for (const permSet in permReqs) {
      if (roles[0].keys(permSet)) {
        hasPerms = comparePerms(
          userPerms[permSet],
          permReqs[permSet],
          permReqs[permSet].includes('&') ? '&' : '|'
        )
        if (hasPerms !== all) {
          break
        }
      }
    }
  }

  return hasPerms
}

const isAuthenticatedSync = () => isBrowser && Boolean(Auth.user)

const extractTokenPayload = dataKey => {
  if (!Auth.user) {
    return null
  }

  const tokenPayload = get(Auth, 'user.signInUserSession.idToken.payload')

  if (!tokenPayload) {
    return null
  }

  const claims =
    CUSTOM_CLAIMS_NAMESPACE in tokenPayload
      ? {
          ...JSON.parse(tokenPayload[HASURA_CLAIMS_NAMESPACE]),
          ...JSON.parse(tokenPayload[CUSTOM_CLAIMS_NAMESPACE]),
        }
      : {
          ...JSON.parse(tokenPayload[HASURA_CLAIMS_NAMESPACE]),
        }

  return claims[dataKey] || null
}

function AuthWrapper({ isAuthInitialized, children }) {
  const [userGroups, setUserGroups] = useState([])

  /**
   * Returns an object detailing a user's permissions
   *
   * @return {object} The current user's permissions
   */
  const getUserTokenData = () => {
    const data = {
      isAuthenticated: Boolean(isAuthenticatedSync()),
      userId: extractTokenPayload(HASURA_USER_ID),
      groupId: extractTokenPayload(HASURA_GROUP_ID),
      role: getUserRole(),
    }

    return data
  }

  /**
   * Checks a user's role against the minimum role level required
   *
   * @param {string} reqRole The minimum role-level at which the permission check is allowed to return true
   * @return {boolean} Whether or not the current user qualifies for the permission-role checked
   */
  const getUserAuth = permReqs => {
    if (!isAuthenticatedSync()) return false
    if (!permReqs || permReqs === undefined) return true

    return checkPerms(permReqs)
  }

  /**
   * Finds the current user's role and appends the group to the role if necessary
   *
   * @return {string} The user's role, with appended group if necessary
   */
  const getUserRole = () => {
    if (!isAuthenticatedSync()) return 'public'
    const baseRole = getUserBaseRole()
    const group = getUserGroup()
    return group !== undefined && baseRole === 'admin'
      ? `${group.type}-${baseRole}`
      : baseRole
  }

  /**
   * Get the base user role from the Hasura JWT Token
   *
   * @return {string} The user's role, without appended group
   */
  const getUserBaseRole = () => {
    try {
      return extractTokenPayload(CUSTOM_CLAIMS_NAMESPACE)
    } catch {
      return 'public'
    }
  }

  /**
   * Get the default user group
   *
   * @return {object} The user's group: {id, type, name}
   */
  const getUserGroup = () => {
    try {
      const taxonomyQueryResult = userGroups
      const groupId = extractTokenPayload(HASURA_GROUP_ID)
      return find(taxonomyQueryResult.raw_salmon.group, { id: groupId })
    } catch {
      return undefined
    }
  }

  const auth = {
    isAuthInitialized,
    getUserTokenData,
    getUserAuth,
    getUserRole,
    isAuthenticatedSync,
    setUserGroups,
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

AuthWrapper.propTypes = {
  isAuthInitialized: T.bool,
  children: T.node,
}

AuthWrapper.defaultProps = {
  isAuthInitialized: false,
  children: undefined,
}

export default AuthWrapper
