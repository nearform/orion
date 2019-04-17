import React from 'react'
import Users from './Users'

const getPendingUsers = `query getPendingUsers {
  user(where: { pending: { _eq: true } }) {
    id
    name
    pending
  }
}`

export default function PendingUsers() {
  return (
    <Users
      query={getPendingUsers}
      pageTitle="Pending Users"
      enableGroupsPicker={true}
    />
  )
}
