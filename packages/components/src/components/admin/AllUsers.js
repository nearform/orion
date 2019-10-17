import React from 'react'
import { useQuery, useMutation } from 'graphql-hooks'
import classnames from 'classnames'
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

import UserRoleChip from '../StatusChip/UserRoleChip'
import useAdminTable from '../../hooks/useAdminTable'
import AdminModal from './AdminModal'
import UserSelectPicker from './UserSelectPicker'

import {
  getUsers,
  getEdittableUserFields,
  addUserGroupMutation,
  assignUserGroupMutation,
  addUserRoleMutation,
  assignUserRoleMutation,
} from '../../../queries'

const styles = theme => ({
  middle: {
    verticalAlign: 'middle',
  },
  assigned: {
    color: theme.palette.secondary.main,
  },
})

const headers = [
  { id: 'id', label: 'ID', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'orgName', label: 'Org name' },
  { id: 'orgType', label: 'Org type' },
  { id: 'country', label: 'Country' },
  { id: 'group', label: 'Group' },
  { id: 'role', label: 'Role' },
  {
    id: 'edit',
    label: 'Edit',
    cellProps: {
      align: 'center',
    },
  },
]

function getRelationalName(user, relation, entity) {
  const entries = user[relation]
  return entries.length ? entries[0][entity].name : null
}

function getStyledSignupAttr(user, key) {
  if (!user.signupRequest || !user.signupRequest.userAttributes[key])
    return (
      <Typography variant="body2" color="textSecondary">
        None
      </Typography>
    )

  return (
    <Typography variant="body2">
      {user.signupRequest.userAttributes[key]}
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
      <Typography
        variant="body2"
        noWrap
        color={user.pending ? 'textSecondary' : 'textPrimary'}
      >
        <StatusIcon
          className={classnames(classes.middle, {
            [classes.assigned]: !user.pending,
          })}
          fontSize="small"
          color="inherit"
        />{' '}
        <span>{groupName || 'Unassigned'}</span>
      </Typography>
    </Tooltip>
  )
}

function AllUsers({ classes, query, variables }) {
  const { table, selected, setSelected, refetch } = useAdminTable({
    query,
    headers,
    variables,
    renderTableBody: data =>
      data.user.map(user => (
        <TableRow key={user.id.toString()} data-testid="all-users" size="small">
          <TableCell>
            <Typography variant="body2">{user.id}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">{user.email}</Typography>
          </TableCell>
          <TableCell>{getStyledSignupAttr(user, 'custom:orgName')}</TableCell>
          <TableCell>{getStyledSignupAttr(user, 'custom:orgType')}</TableCell>
          <TableCell>{getStyledSignupAttr(user, 'custom:country')}</TableCell>
          <TableCell>{getGroupAndStatus(user, classes)}</TableCell>
          <TableCell>
            <UserRoleChip
              status={
                getRelationalName(user, 'user_roles', 'role') || 'Not Assigned'
              }
            />
          </TableCell>
          <TableCell align="center" padding="none">
            <IconButton onClick={() => setSelected(user)}>
              <Edit color="secondary" />
            </IconButton>
          </TableCell>
        </TableRow>
      )),
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
    if (mutationPromises.length) {
      refetch()
    }
  }

  const getModalInitialValues = user => {
    const groupId = user.user_groups.length && user.user_groups[0].group.id
    const roleId = user.user_roles.length && user.user_roles[0].role.id

    return {
      userId: user ? user.id : null,
      groupId: groupId || 0,
      groupIsAssigned: !!groupId,
      roleId: roleId || 0,
      roleIsAssigned: !!roleId,
    }
  }

  return (
    <>
      <AdminModal
        selected={selected}
        data={modalData}
        contents={modalContents}
        getTitleParts={user => ['Edit', user.email]}
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
