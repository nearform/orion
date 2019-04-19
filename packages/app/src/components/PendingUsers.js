import React from 'react'
import {
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
} from '@material-ui/core'

import AdminTable from './AdminTable'
import UserGroupsPicker from './UserGroupsPicker'

const query = `query getPendingUsers {
  user(where: { pending: { _eq: true } }) {
    id
    name
    pending
  }
}`

const headers = ['id', 'name', 'pending', 'action']

export default function PendingUsers() {
  return AdminTable({
    query,
    pageTitle: 'Pending Users',
    headers,
    Modal: UserGroupsPicker,
    AdminTableContent: function({ data, setSelected }) {
      const { user } = data
      return (
        <TableBody>
          {user.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.pending.toString()}</TableCell>
              <TableCell>
                <Tooltip
                  title={`Associate ${user.name} with a group`}
                  aria-label="Add"
                >
                  <IconButton onClick={() => setSelected(user)}>+</IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )
    },
  })
}
