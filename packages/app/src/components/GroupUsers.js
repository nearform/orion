import React from 'react'
import T from 'prop-types'
import { Typography } from '@material-ui/core'

import AllUsers from './AllUsers.js'

// TODO: find a way to alter AllUsers query to reduce duplication
import { getUsersInGroup } from '../queries'

export default function GroupUsers({ groupName, groupId }) {
  const pageTitle = (
    <span>
      Users in {groupName}{' '}
      <Typography inline variant="h3" color="textSecondary">
        {' '}
        Group #{groupId}{' '}
      </Typography>
    </span>
  )

  return (
    <AllUsers
      query={getUsersInGroup}
      variables={{ groupId }}
      pageTitle={pageTitle}
    />
  )
}

GroupUsers.propTypes = {
  groupName: T.string,
  groupId: T.string,
}
