import get from 'lodash/get'
import first from 'lodash/first'

export function getUserGroup(user) {
  return get(first(user.user_groups), 'group')
}
