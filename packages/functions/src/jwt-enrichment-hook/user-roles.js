import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import first from 'lodash/first'

export const DEFAULT_ROLE_NAME = 'user'

export function selectDefaultRoleName(roles, group) {
  const baseRole = first(sortBy(roles, 'order'))

  if (!group.type) {
    return baseRole ? baseRole.name : DEFAULT_ROLE_NAME
  }

  return baseRole ? `${group.type}-${baseRole.name}` : DEFAULT_ROLE_NAME
}

export function getUserRoles(user) {
  return map(user.user_roles, 'role')
}
