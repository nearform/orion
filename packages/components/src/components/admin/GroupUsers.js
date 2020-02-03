import React from 'react'
import T from 'prop-types'

import { getUsersInGroup } from '../../../queries'
import AllUsers from './AllUsers'

export default function GroupUsers({ groupIdString }) {
  const groupId = Number.parseInt(groupIdString, 10)
  return <AllUsers query={getUsersInGroup} variables={{ groupId }} />
}

GroupUsers.propTypes = {
  groupIdString: T.string,
}
