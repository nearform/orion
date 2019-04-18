import React, { useState } from 'react'
import T from 'prop-types'
import { useQuery } from 'graphql-hooks'
import {
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Tooltip,
} from '@material-ui/core'

import UserGroupsPicker from './UserGroupsPicker'

export default function Users({ query, pageTitle, variables, enableGroupsPicker }) {
  const [chosenUser, setChosenUser] = useState(null)
  const { loading, error, data: users, refetch: refetchUsers } = useQuery(query, { variables })

  if (loading) return 'Loading...'
  if (error) return 'Error!'

  return (
    <>
      <Typography variant="h3" gutterBottom>
        {pageTitle}
      </Typography>
      {enableGroupsPicker && (
        <UserGroupsPicker
          user={chosenUser}
          onClose={() => setChosenUser(null)}
          onApply={() => {
            refetchUsers()
            setChosenUser(null)
          }}
        />
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>pending</TableCell>
            {enableGroupsPicker && <TableCell>actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.user.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.pending.toString()}</TableCell>
              {enableGroupsPicker && (
                <TableCell>
                  <Tooltip
                    title={`Associate ${user.name} with a group`}
                    aria-label="Add"
                  >
                    <IconButton onClick={() => setChosenUser(user)}>
                      +
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

Users.defaultProps = {
  variables: {},
  enableGroupsPicker: false,
}

Users.propTypes = {
  query: T.string,
  pageTitle: T.string,
  variables: T.object,
  enableGroupsPicker: T.bool,
}
