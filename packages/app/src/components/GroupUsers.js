import React from 'react'
import Users from './Users'

const getUsersInGroup = `query getUsersInGroup ($groupId: Int!) {
  user (where: {user_groups: { group_id: { _in: [$groupId] }}}){
    user_groups {
      group_id
    }
    id
    name
    pending
  }}`

export default function GroupUsers({ groupName, groupId }) {
  return (
    <Users
      query={getUsersInGroup}
      variables={{ groupId }}
      pageTitle={`Users in group ${groupName} with id ${groupId}`}
    />
  )
}
