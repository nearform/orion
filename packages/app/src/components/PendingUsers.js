import React, { Fragment, useState } from 'react'
import {
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
} from '@material-ui/core'
import TablePagination from '@material-ui/core/TablePagination'

import AdminTable from './AdminTable'
import UserGroupsPicker from './UserGroupsPicker'

import { getPendingUsers } from '../queries'

const headers = ['id', 'name', 'pending', 'action']

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
        </Fragment>
      )
    },
  })
}
