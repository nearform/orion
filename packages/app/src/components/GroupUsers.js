import React from 'react'
import T from 'prop-types'
import { Typography } from '@material-ui/core'

import AllUsers from './AllUsers.js'

// TODO: find a way to alter AllUsers query to reduce duplication
const query = `query getUsersInGroup ($groupId: Int!) {
  user (where: {user_groups: { group_id: { _in: [$groupId] }}}){
    id
    name
    signupRequest
    user_groups {
      group {
        name
      }
    }
    user_roles {
      role {
        name
      }
    }
  }
}`

export default function GroupUsers({ groupName, groupId }) {
  const pageTitle = (
    <span>
      Users in {groupName}{' '}
      <Typography inline variant="h6" color="textSecondary">
        {' '}
        Group #{groupId}{' '}
      </Typography>
    </span>
  )

  return (
    <AllUsers query={query} variables={{ groupId }} pageTitle={pageTitle} />
  )
}

GroupUsers.propTypes = {
  groupName: T.string,
  groupId: T.string,
}
