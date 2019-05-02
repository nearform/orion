import React, { Fragment } from 'react'
import T from 'prop-types'
import {
  withStyles,
  TableRow,
  TableCell,
  Typography,
  Tooltip,
} from '@material-ui/core'
import { HowToReg, ErrorOutline } from '@material-ui/icons'

import AdminTable from './AdminTable'

import { getUsers } from '../queries'

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
  { id: 'group', label: 'Group' },
  { id: 'role', label: 'Role' },
]

function getRelationalName(user, relation, entity) {
  const entries = user[relation]
  return entries.length ? entries[0][entity].name : null
}

function getStyledSignupAttr(user, key) {
  if (!user.signupRequest || !user.signupRequest.userAttributes[key])
    return <Typography color="textSecondary">None</Typography>

  return <Typography>{user.signupRequest.userAttributes[key]}</Typography>
}

function getStyledRoleName(user) {
  const roleName = getRelationalName(user, 'user_roles', 'role')
  return (
    <Typography
      color={roleName !== 'non-member' ? 'textPrimary' : 'textSecondary'}
    >
      {roleName}
    </Typography>
  )
}

function getGroupAndStatus(user, classes) {
  const StatusIcon = user.pending ? ErrorOutline : HowToReg
  const groupName = getRelationalName(user, 'user_groups', 'group')
  return (
    <Tooltip
      noWrap
      title={user.pending ? 'Pending user' : 'Assigned user'}
      placement="top"
    >
      <Typography noWrap color={user.pending ? 'textSecondary' : 'textPrimary'}>
        <StatusIcon
          className={classes.middle}
          fontSize="small"
          color="inherit"
        />{' '}
        <span>{groupName || 'Unassigned'}</span>
      </Typography>
    </Tooltip>
  )
}

function AllUsers({ classes, query, pageTitle, variables }) {
  return AdminTable({
    query,
    pageTitle,
    headers,
    variables,
    AdminTableContent: function({ data }) {
      const { user } = data
      return (
        <Fragment>
          {user.map(user => (
            <TableRow key={user.id.toString()}>
              <TableCell padding="dense">{user.id}</TableCell>
              <TableCell>
                <Typography>{user.email}</Typography>
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
              <TableCell>{getGroupAndStatus(user, classes)}</TableCell>
              <TableCell>{getStyledRoleName(user)}</TableCell>
              {/*
              TODO: uncomment when edit functionality is implemented
              <TableCell>
                <Edit color="secondary" />
              </TableCell>
            */}
            </TableRow>
          ))}
        </Fragment>
      )
    },
  })
}

AllUsers.defaultProps = {
  query: getUsers,
  pageTitle: 'All Users',
}

AllUsers.propTypes = {
  query: T.string,
  pageTitle: T.node,
  variables: T.object,
}

export default withStyles(styles)(AllUsers)
