import React from 'react'
import slugify from 'slugify'
import { Link as RouterLink } from '@reach/router'
import { useQuery, useMutation } from 'graphql-hooks'
import { Formik, Form, Field } from 'formik'
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

const getGroups = `
query getGroups {
  group {
    id
    name
    roles {
      role {
        name
      }
    }
  }
}`

const createGroupMutation = `
mutation createGroup ($name: String!, $roleId: Int!) {
  insert_group(objects: {name: $name, roles: {data: {role_id: $roleId}}}) {
    returning {
      id
      name
    }
  }
}
`

const getRoles = `
query getRoles {
  role {
    id
    name
  }
}
`

const deleteGroupMutation = `
mutation deleteGroup($id: Int!) {
  delete_group_role(where: {group_id: { _eq: $id}}) {
    affected_rows
  }
  delete_group(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
`

const GroupSchema = Yup.object().shape({
  name: Yup.string().required(),
  roleId: Yup.number()
    .integer()
    .required(),
})

export default function UserGroups() {
  const {
    loading: groupsLoading,
    error: groupsError,
    data: groups,
    refetch: refetchGroups,
  } = useQuery(getGroups)

  const { loading: rolesLoading, error: rolesError, data: roles } = useQuery(
    getRoles
  )

  const [createGroup] = useMutation(createGroupMutation)
  const [deleteGroup] = useMutation(deleteGroupMutation)

  const doDeleteGroup = async id => {
    await deleteGroup({ variables: { id } })
    refetchGroups()
  }

  if (groupsLoading || rolesLoading) return 'Loading...'
  if (groupsError || rolesError) return 'Error!'

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
            await refetchGroups()
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
      <Typography variant="h2" gutterBottom>
        Group list
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>roles</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.group.map(group => (
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
        </TableBody>
      </Table>
    </div>
  )
}
