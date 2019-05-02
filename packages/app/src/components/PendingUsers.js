import React, { Fragment } from 'react'
import { TableRow, TableCell, Tooltip, IconButton } from '@material-ui/core'

import AdminTable from './AdminTable'
import UserGroupsPicker from './UserGroupsPicker'

import { getPendingUsers } from '../queries'

const headers = [
  { id: 'id', label: 'ID', sortable: true },
  { id: 'pending', label: 'Pending' },
  { id: 'action', label: 'Action' },
]

export default function PendingUsers() {
  return AdminTable({
    query: getPendingUsers,
    pageTitle: 'Pending Users',
    headers,
    Modal: UserGroupsPicker,
    AdminTableContent: function({ data, setSelected }) {
      const { user } = data

      return (
        <Fragment>
          {user.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.pending.toString()}</TableCell>
              <TableCell>
                <Tooltip
                  title={`Associate user ${user.id} with a group`}
                  aria-label="Add"
                >
                  <IconButton onClick={() => setSelected(user)}>+</IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </Fragment>
      )
    },
  })
}
