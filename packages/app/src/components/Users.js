import React from 'react'
import T from 'prop-types'
import { useQuery } from 'graphql-hooks'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@material-ui/core'

export default function Users({ query, pageTitle, variables }) {
  const { loading, error, data: users } = useQuery(query, { variables })

  if (loading) return 'Loading...'
  if (error) return 'Error!'

  return (
    <>
      <Typography variant="h3" gutterBottom>
        {pageTitle}
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

Users.defaultProps = {
  variables: {},
}

Users.propTypes = {
  variables: T.object,
}
