import React, { Fragment } from 'react'
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

import AdminTable from './AdminTable'

const GroupSchema = Yup.object().shape({
  name: Yup.string().required(),
  roleId: Yup.number()
    .integer()
    .required(),
})

const headers = ['id', 'name', 'roles']

export default function UserGroups() {
  const { loading: rolesLoading, error: rolesError, data: roles } = useQuery(
    getRoles
  )

  const [createGroup] = useMutation(createGroupMutation)
  const [deleteGroup] = useMutation(deleteGroupMutation)

  const doDeleteGroup = async id => {
    await deleteGroup({ variables: { id } })
    // TODO: this needs to be changed to pass in the refetch method from useQuery
    // refetchGroups()
  }

  if (rolesLoading) return 'Loading...'
  if (rolesError) return 'Error!'

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Groups
      </Typography>
      <Typography variant="h2" gutterBottom>
        Create group
      </Typography>
      <Formik
        validationSchema={GroupSchema}
        initialValues={{ name: '', roleId: roles.role[0].id }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await createGroup({ variables: values })
            // TODO: this needs to be changed to pass in the refetch method from useQuery
            // from the parent
            // await refetchGroups()
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
      <AdminTable
        query={getGroupsWithRoles}
        pageTitles="Group list"
        headers={headers}
        AdminTableContent={({ data }) => {
          const { group: groups } = data
          return (
            <Fragment>
              {groups.map(group => (
                <TableRow key={group.id}>
                  <TableCell>{group.id}</TableCell>
                  <TableCell>
                    <RouterLink to={`${group.id}/${slugify(group.name)}`}>
                      {group.name}
                    </RouterLink>
                  </TableCell>
                  <TableCell>
                    {group.roles.map(r => r.role.name).join(', ')}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => doDeleteGroup(group.id)}>
                      x
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          )
        }}
      />
    </div>
  )
}
