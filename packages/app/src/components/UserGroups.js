import React from 'react'
import { useQuery, useMutation } from 'graphql-hooks'
import { Formik, Form, Field } from 'formik'
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
} from '@material-ui/core'

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

  if (groupsLoading || rolesLoading) return 'Loading...'
  if (groupsError || rolesError) return 'Error!'

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        New Group
      </Typography>
      <Formik
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
      <Typography variant="h3" gutterBottom>
        Groups
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>roles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.group.map(group => (
            <TableRow key={group.id}>
              <TableCell>{group.id}</TableCell>
              <TableCell>{group.name}</TableCell>
              <TableCell>
                {group.roles.map(r => r.role.name).join(', ')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
