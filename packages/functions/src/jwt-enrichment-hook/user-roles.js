import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import first from 'lodash/first'

const ADMIN_ROLE_NAME = 'admin'
const DEFAULT_MEMBER_ROLE_NAME = 'user'
export const DEFAULT_ROLE_NAME = 'public'

const roleMap = {
  member: DEFAULT_MEMBER_ROLE_NAME,
  'non-member': DEFAULT_ROLE_NAME,
}

function mapRole(role) {
  return roleMap[role.name]
}

function prefixRole(role, group) {
  return role.name === ADMIN_ROLE_NAME
    ? `${group.type}-${role.name}`
    : mapRole(role)
}

export function selectDefaultRoleName(roles, group) {
  const baseRole = first(sortBy(roles, 'order'))

  // superadmin group
  if (!group.type) {
    return baseRole ? baseRole.name : DEFAULT_MEMBER_ROLE_NAME
  }

  return baseRole ? prefixRole(baseRole, group) : DEFAULT_MEMBER_ROLE_NAME
}

export function getUserRoles(user) {
  return map(user.user_roles, 'role')
}
