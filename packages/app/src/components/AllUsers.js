import React from 'react'
import { useQuery, useMutation } from 'graphql-hooks'
import T from 'prop-types'
import {
  withStyles,
  TableRow,
  TableCell,
  Typography,
  Tooltip,
  IconButton,
} from '@material-ui/core'
import { HowToReg, ErrorOutline, Edit } from '@material-ui/icons'
import * as Yup from 'yup'

import useAdminTable from './useAdminTable'
import AdminModal from './AdminModal'
import UserSelectPicker from './UserSelectPicker'

import {
  getUsers,
  getEdittableUserFields,
  addUserGroupMutation,
  assignUserGroupMutation,
  addUserRoleMutation,
  assignUserRoleMutation,
} from '../queries'

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
  { id: 'edit', label: 'Edit' },
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
  return (
    <Typography>{getRelationalName(user, 'user_roles', 'role')}</Typography>
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
  const { table, selected, setSelected, refetch } = useAdminTable({
    query,
    headers,
    variables,
    renderTableBody: data => {
      return data.user.map(user => (
        <TableRow key={user.id.toString()}>
          <TableCell padding="dense">{user.id}</TableCell>
          <TableCell>
            <Typography>{user.email}</Typography>
          </TableCell>
          <TableCell>{getStyledSignupAttr(user, 'custom:orgName')}</TableCell>
          <TableCell>{getStyledSignupAttr(user, 'custom:orgType')}</TableCell>
          <TableCell>{getStyledSignupAttr(user, 'custom:country')}</TableCell>
          <TableCell>{getGroupAndStatus(user, classes)}</TableCell>
          <TableCell>{getStyledRoleName(user)}</TableCell>
          <TableCell>
            <IconButton onClick={() => setSelected(user)}>
              <Edit color="secondary" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))
    },
  })

  const { data: modalData } = useQuery(getEdittableUserFields)
  const [doAddUserGroup] = useMutation(addUserGroupMutation)
  const [doAssignUserGroup] = useMutation(assignUserGroupMutation)
  const [doAddUserRole] = useMutation(addUserRoleMutation)
  const [doAssignUserRole] = useMutation(assignUserRoleMutation)

  const modalContents = [
    {
      label: 'Group',
      FieldComponent: UserSelectPicker,
      entityKey: 'group',
    },
    {
      label: 'Role',
      FieldComponent: UserSelectPicker,
      entityKey: 'role',
    },
  ]

  const modalSchema = Yup.object().shape({
    userId: Yup.number().integer(),
    groupId: Yup.number().integer(),
    groupIsAssigned: Yup.boolean(),
    roleId: Yup.number().integer(),
    roleIsAssigned: Yup.boolean(),
  })

  const onModalSave = async values => {
    // Do mutation queries in parallel
    const mutationPromises = []

    if (values.groupId) {
      const groupMutation = values.groupIsAssigned
        ? doAssignUserGroup
        : doAddUserGroup

      mutationPromises.push(
        groupMutation({
          variables: {
            userId: values.userId,
            groupId: values.groupId,
          },
        })
      )
    }
    if (values.roleId) {
      const roleMutation = values.roleIsAssigned
        ? doAssignUserRole
        : doAddUserRole

      mutationPromises.push(
        roleMutation({
          variables: {
            userId: values.userId,
            roleId: values.roleId,
          },
        })
      )
    }
    await Promise.all(mutationPromises)
    setSelected(null)

    // Only refetch if something changed
    mutationPromises.length && refetch()
  }

  const getModalInitialValues = user => {
    const groupId = user.user_groups.length && user.user_groups[0].group.id
    const roleId = user.user_roles.length && user.user_roles[0].role.id

    return {
      userId: user ? user.id : null,
      groupId: groupId || null,
      groupIsAssigned: !!groupId,
      roleId: roleId || null,
      roleIsAssigned: !!roleId,
    }
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {pageTitle}
      </Typography>
      <AdminModal
        selected={selected}
        data={modalData}
        contents={modalContents}
        title={user => `Edit ${user.email}`}
        onSave={onModalSave}
        onClose={() => setSelected(null)}
        schema={modalSchema}
        getInitialValues={getModalInitialValues}
      />
      {table}
    </>
  )
}

AllUsers.defaultProps = {
  query: getUsers,
  pageTitle: 'All Users',
}

AllUsers.propTypes = {
  classes: T.object,
  query: T.string,
  pageTitle: T.node,
  variables: T.object,
}

export default withStyles(styles)(AllUsers)
