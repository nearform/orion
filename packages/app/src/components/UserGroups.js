import React from 'react'
import slugify from 'slugify'
import { Link as RouterLink } from '@reach/router'
import { useQuery, useMutation } from 'graphql-hooks'
import { Formik, Form, Field } from 'formik'
import {
  Typography,
  TableRow,
  TableCell,
  Button,
  IconButton,
} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

import {
  createGroupMutation,
  getGroupsWithRoles,
  deleteGroupMutation,
  getRoles,
} from '../queries'

import useAdminTable from '../hooks/useAdminTable'

const GroupSchema = Yup.object().shape({
  name: Yup.string().required(),
  roleId: Yup.number()
    .integer()
    .required(),
})

const headers = [
  { id: 'id', label: 'ID', sortable: true },
  { id: 'name', label: 'Group', sortable: true },
  { id: 'roles', label: 'Roles' },
  { id: 'action', label: 'Action' },
]

function TitleWrapper({ children }) {
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Groups
      </Typography>
      {children}
    </>
  )
}

export default function UserGroups() {
  const { loading: rolesLoading, error: rolesError, data: roles } = useQuery(
    getRoles
  )
  const [createGroup] = useMutation(createGroupMutation)
  const [deleteGroup] = useMutation(deleteGroupMutation)

  const { refetch: refetchGroups, table } = useAdminTable({
    query: getGroupsWithRoles,
    headers,
    renderTableBody: (data, { refetch: refetchGroups }) => {
      const doDeleteGroup = async id => {
        await deleteGroup({ variables: { id } })
        refetchGroups()
      }
      return data.group.map(group => (
        <TableRow key={group.id} data-testid="user-groups">
          <TableCell>{group.id}</TableCell>
          <TableCell>
            <RouterLink to={`${group.id}/${slugify(group.name)}`}>
              {group.name}
            </RouterLink>
          </TableCell>
          <TableCell>{group.roles.map(r => r.role.name).join(', ')}</TableCell>
          <TableCell>
            <IconButton onClick={async () => doDeleteGroup(group.id)}>
              x
            </IconButton>
          </TableCell>
        </TableRow>
      ))
    },
  })

  if (rolesLoading) return <TitleWrapper>Loading roles...</TitleWrapper>
  if (rolesError) return <TitleWrapper>Error loading roles</TitleWrapper>

  return (
    <TitleWrapper>
      <Typography variant="h2" gutterBottom>
        Create group
      </Typography>
      <Formik
        validationSchema={GroupSchema}
        initialValues={{ name: '', roleId: roles.role[0].id }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await createGroup({ variables: values })
            refetchGroups()
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              variant="outlined"
              name="name"
              placeholder="name"
            />
            <Field
              component={TextField}
              select
              SelectProps={{ native: true }}
              variant="outlined"
              name="roleId"
              label="role"
            >
              {roles.role.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Field>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
      {table}
    </TitleWrapper>
  )
}
