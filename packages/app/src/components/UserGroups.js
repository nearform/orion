import React from 'react'
import { useQuery } from 'graphql-hooks'

const getUserGroups = `query getGroups {
  group {
    id
    name
  }
}`

export default function UserGroups() {
  const { loading, error, data: groups } = useQuery(getUserGroups)

  if (loading) return 'Loading...'
  if (error) return 'Error!'

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        {groups.group.map(group => (
          <tr key={group.id}>
            <td>{group.id}</td>
            <td>{group.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
