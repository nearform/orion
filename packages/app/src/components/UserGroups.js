import React from 'react'
import { useQuery, useMutation } from 'graphql-hooks'
import { Formik, Form, Field } from 'formik'

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
      <h1>New Group</h1>
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
            <Field name="name" placeholder="name" />
            <Field name="roleId" component="select">
              {roles.role.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
          </Form>
        )}
      </Formik>
      <h1>Groups</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>roles</th>
          </tr>
        </thead>
        <tbody>
          {groups.group.map(group => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.name}</td>
              <td>{group.roles.map(r => r.role.name).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
