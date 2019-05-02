import React, { Fragment } from 'react'
import {
  withStyles,
  TableRow,
  TableCell,
  Tooltip,
  Typography,
  IconButton,
} from '@material-ui/core'
import { VerifiedUser, ErrorOutline, HowToReg } from '@material-ui/icons'

import AdminTable from './AdminTable'
import UserGroupsPicker from './UserGroupsPicker'

import { getPendingUsers } from '../queries'

const styles = {
  middle: {
    verticalAlign: 'middle',
  },
}

const headers = [
  { id: 'id', label: 'ID', sortable: true },
  { id: 'email', label: 'Email' },
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
  return AdminTable({
    query: getPendingUsers,
    pageTitle: 'Pending Users',
    headers,
    Modal: UserGroupsPicker,
    AdminTableContent: function({ data, setSelected }) {
      const { user } = data

      return (
        <Fragment>
          {user.map(user => {
            const { email, email_verified } = user.signupRequest.userAttributes
            const isVerfified = email_verified === 'true'
            const StatusIcon = isVerfified ? VerifiedUser : ErrorOutline
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Tooltip
                    title={`${isVerfified ? 'V' : 'Unv'}erified email address`}
                    placement="top"
                  >
                    <Typography
                      noWrap
                      color={isVerfified ? 'textPrimary' : 'textSecondary'}
                    >
                      <StatusIcon fontSize="small" className={classes.middle} />{' '}
                      {email}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {getStyledSignupAttr(user, 'custom:orgName')}
                </TableCell>
                <TableCell>
                  {getStyledSignupAttr(user, 'custom:orgType')}
                </TableCell>
                <TableCell>
                  {getStyledSignupAttr(user, 'custom:country')}
                </TableCell>
                <TableCell>
                  <Tooltip title={`Assign group to ${email}`} aria-label="Add">
                    <IconButton onClick={() => setSelected(user)}>
                      <HowToReg color="secondary" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )
          })}
        </Fragment>
      )
    },
  })
}

export default withStyles(styles)(PendingUsers)
