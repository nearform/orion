import React from 'react'
import {
  withStyles,
  TableRow,
  TableCell,
  Tooltip,
  Typography,
  IconButton,
} from '@material-ui/core'
import { HowToReg } from '@material-ui/icons'

import useAdminTable from './useAdminTable'
import UserGroupsPicker from './UserGroupsPicker'

import { getPendingUsers } from '../queries'

const styles = {
  middle: {
    verticalAlign: 'middle',
  },
}

const headers = [
  { id: 'id', label: 'ID', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'orgName', label: 'Org name' },
  { id: 'orgType', label: 'Org type' },
  { id: 'country', label: 'Country' },
  { id: 'action', label: 'Assign group' },
]

function getStyledSignupAttr(user, key) {
  if (!user.signupRequest.userAttributes[key])
    return <Typography color="textSecondary">None</Typography>

  return <Typography>{user.signupRequest.userAttributes[key]}</Typography>
}

function PendingUsers({ classes }) {
  const { selected, setSelected, refetch, table } = useAdminTable({
    query: getPendingUsers,
    headers,
    renderTableBody: (data, { setSelected }) => {
      return data.user.map(user => {
        return (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>
              <Typography>{user.email}</Typography>
            </TableCell>
            <TableCell>{getStyledSignupAttr(user, 'custom:orgName')}</TableCell>
            <TableCell>{getStyledSignupAttr(user, 'custom:orgType')}</TableCell>
            <TableCell>{getStyledSignupAttr(user, 'custom:country')}</TableCell>
            <TableCell>
              <Tooltip title={`Assign group to ${user.email}`} aria-label="Add">
                <IconButton onClick={() => setSelected(user)}>
                  <HowToReg color="secondary" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        )
      })
    },
  })
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Pending Users
      </Typography>
      <UserGroupsPicker
        selected={selected}
        onClose={() => setSelected(null)}
        onApply={() => {
          refetch()
          setSelected(null)
        }}
      />
      {table}
    </>
  )
}

export default withStyles(styles)(PendingUsers)
