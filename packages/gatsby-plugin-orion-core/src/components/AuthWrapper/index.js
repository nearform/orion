import React, { createContext } from 'react'
import T from 'prop-types'
import { Auth } from 'aws-amplify'
import { permissions } from '../../utils/permissions'

const isBrowser = typeof window !== 'undefined'
const HASURA_CLAIMS_NAMESPACE = 'https://hasura.io/jwt/claims'
const CUSTOM_CLAIMS_NAMESPACE = 'X-Orion-Claims'

export const AuthContext = createContext({ isAuthInitialized: false })

/**
 * A user object exists within a browser window
 *
 * @return {boolean}
 */
const isAuthenticated = () => isBrowser && Boolean(Auth.user)

/**
 * Extracts data from aws-amplify provided JWT
 *
 * @return {object} JWT namespace data
 */
const extractTokenPayload = () => {
  const tokenPayload = isAuthenticated()
    ? Auth.user.signInUserSession.idToken.payload
    : undefined

  return tokenPayload
    ? {
        ...JSON.parse(tokenPayload[HASURA_CLAIMS_NAMESPACE]),
        ...JSON.parse(tokenPayload[CUSTOM_CLAIMS_NAMESPACE]),
      }
    : undefined
}

/**
 * Compares a given permission set against the given required permissions
 * Intended to be used only as a private function by the local checkPermissions function
 *
 * @param {string} permSet Permission set to compare
 * @param {number} userPerms Allowed permissions for user
 * @param {string} reqString Required permissions, separated by & or |
 * @return {boolean} True if permission checks pass, False otherwise
 */
const comparePerms = (permSet, userPerms, reqString) => {
  const divider = reqString.includes('|') ? '|' : '&'
  const reqSet = reqString.split(divider)
  const val = reqSet.reduce((acc, curr) => acc + permissions[permSet][curr])
  return divider === '|' ? (val & userPerms) > 0 : (val & userPerms) === val
}

function AuthWrapper({ children, isAuthInitialized }) {
  /**
   * Check a user's permissions against required permissions for an action
   * Intended to be called before performing any permission-restricted action
   *
   * @param {object} permReqs Required permissions object allowing check against multiple
   *                          permission sets and application of and/or logic. In the format
   *                          of: {permSet: 'perm&perm&perm'} or {permSet: 'perm|perm|perm'}
   *                          Example: {user: 'create&read&update&delete', page: 'read|update' }
   * @param {boolean} all If True, all permission sets must pass for function to return True. If
   *                      False, only one permission set must pass for function to return True
   * @return {boolean} True if permission checks pass, False otherwise
   */
  const checkPermissions = (permReqs, all = true) => {
    const { permissions } = getUserTokenData()

    let hasPerms = false
    for (const permSet in permReqs) {
      if (permissions.keys.includes(permSet)) {
        hasPerms = comparePerms(permSet, permissions, permReqs[permSet])
        if (hasPerms !== all) {
          break
        }
      }
    }

    return hasPerms
  }

  /**
   * Get user data from the aws-amplify provided JWT token
   *
   * @return {object} The user object for a logged-in user
   */
  const getUserTokenData = () => {
    const claims = extractTokenPayload()
    return claims === undefined
      ? {
          id: 0,
          roleId: 0,
          role: ``,
          permissions: 0,
          groupId: 0,
          group: ``,
        }
      : {
          id: claims[`X-Hasura-User-Id`],
          roleId: claims[`X-Orion-Role-Id`],
          role: claims[`X-Orion-Role`],
          permissions: claims[`X-Orion-User-Role-Permissions`],
          groupId: claims[`X-Hasura-Group-Id`],
          group: claims[`X-Orion-User-Group`],
        }
  }

  const auth = {
    isAuthInitialized,
    getUserTokenData,
    checkPermissions,
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

AuthWrapper.propTypes = {
  children: T.node.isRequired,
  isAuthInitialized: T.bool.isRequired,
}

export default AuthWrapper
