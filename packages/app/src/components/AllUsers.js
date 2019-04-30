import React, { Fragment } from 'react'
import T from 'prop-types'
import { TableRow, TableCell, Typography, Tooltip } from '@material-ui/core'

/* TODO: uncomment when edit functionality is implemented
Edit,
*/
import VerifiedUser from '@material-ui/icons/VerifiedUser'

import AdminTable from './AdminTable'

import { getUsers } from '../queries'

// const headers = [
//   'id',
//   'name',
//   'email',
//   'phone',
//   'group',
//   'role',
//   /* TODO: uncomment when edit functionality is implemented
//   'edit',
// */
// ]

const headers = [
  { id: 'id', label: 'ID', sortable: true },
  { id: 'name', label: 'Name', sortable: true },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'group', label: 'Group' },
  { id: 'role', label: 'Role' },
]

function getRelationalName(user, relation, entity) {
  const entries = user[relation]
  return entries.length ? entries[0][entity].name : null
}

function getStyledGroupName(user) {
  const groupName = getRelationalName(user, 'user_groups', 'group')

  // TODO: Localise localise localise
  return groupName || styleAsSecondary('no group')
}

function getStyledRoleName(user) {
  const roleName = getRelationalName(user, 'user_roles', 'role')
  return roleName !== 'non-member' ? roleName : styleAsSecondary(roleName)
}

function styleAsSecondary(string) {
  return <Typography color="textSecondary">{string}</Typography>
}

function getStyledContactInfo(user, type) {
  if (!user.signupRequest) return styleAsSecondary('none')

  const attrs = user.signupRequest.userAttributes
  const isEmail = type === 'email address'

  const contactInfo = isEmail ? attrs.email : attrs.phone_number
  const isVerifiedString = isEmail
    ? attrs.email_verified
    : attrs.phone_number_verified

  return isVerifiedString === 'true' ? (
    <Tooltip title={`This ${type} is verified`} placement="top">
      <span style={{ whiteSpace: 'nowrap' }}>
        <VerifiedUser fontSize="small" style={{ verticalAlign: 'middle' }} />{' '}
        {contactInfo}
      </span>
    </Tooltip>
  ) : (
    <Typography>{contactInfo}</Typography>
  )
}

export default function AllUsers({ query, pageTitle, variables }) {
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
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                {getStyledContactInfo(user, 'email address')}
              </TableCell>
              <TableCell>
                {getStyledContactInfo(user, 'phone number')}
              </TableCell>
              <TableCell>{getStyledGroupName(user)}</TableCell>
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
  pageTitle: T.oneOfType([T.string, T.node]),
  variables: T.object,
}
