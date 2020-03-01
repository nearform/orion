import React, { createContext, useState } from 'react'
import T from 'prop-types'
import { Auth } from 'aws-amplify'
import { permissions } from '../../utils/permissions'

const isBrowser = typeof window !== 'undefined'
const HASURA_CLAIMS_NAMESPACE = 'https://hasura.io/jwt/claims'
const CUSTOM_CLAIMS_NAMESPACE = 'x-orion-claims'

export const AuthContext = createContext()

const isAuthenticatedSync = () => isBrowser && Boolean(Auth.user)

const extractTokenPayload = () => {
  const tokenPayload = isAuthenticatedSync()
    ? Auth.user.signInUserSession.idToken.payload
    : null

  return tokenPayload
    ? {
        ...JSON.parse(tokenPayload[HASURA_CLAIMS_NAMESPACE]),
        ...JSON.parse(tokenPayload[CUSTOM_CLAIMS_NAMESPACE]),
      }
    : null
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
  const divider = reqString.includes('&') ? '&' : '|'
  const reqSet = reqString.split(divider)
  const val = reqSet.reduce((acc, curr) =>
    (userPerms & permissions[permSet][curr]) === permissions[permSet][curr]
      ? acc++
      : acc
  )
  return divider === '&' ? val === reqSet.length : val > 0
}

function AuthWrapper({ children }) {
  const [userId, setUserId] = useState(0)
  const [userRole, setUserRole] = useState('Guest')
  const [userPermissions, setUserPermissions] = useState(0)
  const [userGroupId, setUserGroupId] = useState(0)
  const [userGroup, setUserGroup] = useState('none')
  /**
   * Check a user's permissions against required permissions for an action
   * Intended to be called before performing any permission-restricted action
   *
   * @param {number} userPerms Allowed permissions for user
   * @param {object} permReqs Required permissions object allowing check against multiple
   *                          permission sets and application of and/or logic. In the format
   *                          of: {permSet: 'perm&perm&perm'} or {permSet: 'perm|perm|perm'}
   *                          Example: {user: 'create&read&update&delete', page: 'read|update' }
   * @param {boolean} all If True, all permission sets must pass for function to return True. If
   *                      False, only one permission set must pass for function to return True
   * @return {boolean} True if permission checks pass, False otherwise
   */
  const checkPermissions = (userPerms, permReqs, all = true) => {
    let hasPerms = false
    for (const permSet in permReqs) {
      if (permissions.keys.includes(permSet)) {
        hasPerms = comparePerms(permSet, userPerms, permReqs[permSet])
        if (hasPerms !== all) {
          break
        }
      }
    }

    return hasPerms
  }

  const getUserTokenData = () => {
    const claims = extractTokenPayload()
    setUserId(claims[`x-hasura-user-id`])
    setUserRole(claims[`x-orion-user-role`])
    setUserPermissions(claims[`x-orion-user-role-permissions`])
    setUserGroupId(claims[`x-hasura-group-id`])
    setUserGroup(claims[`x-orion-user-group`])

    return {
      userId,
      userRole,
      userPermissions,
      userGroupId,
      userGroup,
    }
  }

  const auth = {
    userId,
    userRole,
    userPermissions,
    userGroupId,
    userGroup,
    getUserTokenData,
    checkPermissions,
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

AuthWrapper.propTypes = {
  children: T.node.isRequired,
}

export default AuthWrapper
