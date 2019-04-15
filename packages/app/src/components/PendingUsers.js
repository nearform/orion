import React from 'react'
import { useQuery } from 'graphql-hooks'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@material-ui/core'

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
    <>
      <Typography variant="h3" gutterBottom>
        Pending users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>pending</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.user.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.pending.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
