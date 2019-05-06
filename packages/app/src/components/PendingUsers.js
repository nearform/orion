import React from 'react'
import { useQuery, useMutation } from 'graphql-hooks'
import {
  withStyles,
  TableRow,
  TableCell,
  Tooltip,
  Typography,
  IconButton,
} from '@material-ui/core'
import { HowToReg } from '@material-ui/icons'
import * as Yup from 'yup'

import useAdminTable from './useAdminTable'
import AdminModal from './AdminModal'
import UserSelectPicker from './UserSelectPicker'

import {
  getPendingUsers,
  getGroups,
  addUserGroupMutation,
  assignUserGroupMutation,
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

  const { data: modalData } = useQuery(getGroups, {
    variables: {
      orderBy: { id: 'asc' },
    },
  })

  const [doAddUserGroup] = useMutation(addUserGroupMutation)
  const [doAssignUserGroup] = useMutation(assignUserGroupMutation)

  const modalContents = [
    {
      label: 'Group',
      FieldComponent: UserSelectPicker,
      entityKey: 'group',
    },
  ]

  const modalSchema = Yup.object().shape({
    userId: Yup.number().integer(),
    groupId: Yup.number().integer(),
    groupIsAssigned: Yup.boolean(),
  })

  const onModalSave = async values => {
    const groupMutation = values.groupIsAssigned
      ? doAssignUserGroup
      : doAddUserGroup
    await groupMutation({
      variables: {
        userId: values.userId,
        groupId: values.groupId,
      },
    })
    setSelected(null)
    refetch()
  }

  const getModalInitialValues = user => {
    const groupId = user.user_groups.length && user.user_groups[0].group.id
    return {
      userId: user ? user.id : null,
      groupId: groupId || null,
      groupIsAssigned: !!groupId,
    }
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Pending Users
      </Typography>
      <AdminModal
        selected={selected}
        data={modalData}
        contents={modalContents}
        title={user => `Assign group to ${user.email}`}
        onSave={values => onModalSave(values)}
        onClose={() => setSelected(null)}
        schema={modalSchema}
        getInitialValues={getModalInitialValues}
      />
      {table}
    </>
  )
}

export default withStyles(styles)(PendingUsers)
