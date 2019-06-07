import React from 'react'
import T from 'prop-types'

import AllUsers from './AllUsers.js'
import { getUsersInGroup } from '../queries'

export default function GroupUsers({ groupIdString }) {
  const groupId = Number.parseInt(groupIdString)
  return <AllUsers query={getUsersInGroup} variables={{ groupId }} />
}

GroupUsers.propTypes = {
  groupIdString: T.string,
}
