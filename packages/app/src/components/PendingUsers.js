import React from 'react'
import { useQuery } from 'graphql-hooks'

const getPendingUsers = `query getPendingUsers {
  user(where: { pending: { _eq: true } }) {
    id
    name
    pending
  }
}`

export default function PendingUsers() {
  const { loading, error, data: users } = useQuery(getPendingUsers)

  if (loading) return 'Loading...'
  if (error) return 'Error!'

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>pending</th>
        </tr>
      </thead>
      <tbody>
        {users.user.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.pending.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
