import map from 'lodash/map'
import flatMap from 'lodash/flatMap'
import concat from 'lodash/concat'
import sortBy from 'lodash/sortBy'
import first from 'lodash/first'
import uniqBy from 'lodash/uniqBy'

export function selectDefaultRole(roles) {
  return first(sortBy(roles, 'order'))
}

export function getAllowedRoles(user) {
  const allRoles = uniqBy(
    concat(
      map(user.user_roles, 'role'),
      map(flatMap(user.user_groups, 'group.roles'), 'role')
    ),
    'id'
  )

  return allRoles
}
