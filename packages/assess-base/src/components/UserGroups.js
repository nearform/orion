import React from 'react'
import slugify from 'slugify'
import { Link as RouterLink } from '@reach/router'
import { useMutation } from 'graphql-hooks'
import { Formik, Form, Field } from 'formik'
import {
  withStyles,
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { DeleteForever, KeyboardArrowUp } from '@material-ui/icons'
import * as Yup from 'yup'

import { createGroupMutation, getGroups, deleteGroupMutation } from '../queries'

import { ConfirmDialog, GroupTypeChip, GROUP_TYPES } from 'components'

import useAdminTable from '../hooks/useAdminTable'

import { getGroupIdSync } from '../utils/auth'

const groupTypeKeys = Object.keys(GROUP_TYPES)
const groupTypes = groupTypeKeys.map(key => ({ key, value: GROUP_TYPES[key] }))

const GroupSchema = Yup.object().shape({
  name: Yup.string().required(),
  type: Yup.string().oneOf(groupTypeKeys),
})

const headers = [
  { id: 'id', label: 'ID', sortable: true },
  { id: 'name', label: 'Group', sortable: true },
  { id: 'type', label: 'Type' },
  {
    id: 'action',
    label: 'Action',
    cellProps: {
      align: 'right',
    },
  },
]

function UserGroups({ classes }) {
  const [createGroup] = useMutation(createGroupMutation)
  const [deleteGroup] = useMutation(deleteGroupMutation)
  const { refetch: refetchGroups, table } = useAdminTable({
    query: getGroups,
    headers,
    renderTableBody: (data, { refetch: refetchGroups }) => {
      const doDeleteGroup = async id => {
        await deleteGroup({ variables: { id } })
        refetchGroups()
      }
      return data.group.map(group => (
        <TableRow key={group.id} data-testid="user-groups" size="small">
          <TableCell>
            <Typography variant="body2">{group.id}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">
              <RouterLink to={`${group.id}/${slugify(group.name)}`}>
                {group.name}
              </RouterLink>
            </Typography>
          </TableCell>
          <TableCell>
            <GroupTypeChip status={group.type} />
          </TableCell>
          <TableCell align="right" padding="none">
            <ConfirmDialog
              title={`Delete group “${group.name}”?`}
              text="This group will be permanently deleted. This cannot be undone."
              onConfirm={() => doDeleteGroup(group.id)}
              okayLabel="Delete"
            >
              <IconButton className={classes.actionButton}>
                <DeleteForever />
              </IconButton>
            </ConfirmDialog>
          </TableCell>
        </TableRow>
      ))
    },
  })

  return (
    <>
      <Formik
        validationSchema={GroupSchema}
        initialValues={{
          name: '',
          type: groupTypes[0].key,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await createGroup({
              variables: { ...values, parentId: getGroupIdSync() },
            })
            refetchGroups()
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid
              container
              alignItems="flex-end"
              spacing={2}
              className={classes.newGroup}
            >
              <Grid item xs={3}>
                <InputLabel htmlFor="group-name-input">
                  <Typography
                    variant="h4"
                    gutterBottom
                    className={classes.inputLabel}
                  >
                    Enter new group name
                  </Typography>
                </InputLabel>
                <Field
                  id="group-name-input"
                  component={TextField}
                  name="name"
                  placeholder="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <InputLabel htmlFor="group-type-input">
                  <Typography
                    variant="h4"
                    gutterBottom
                    className={classes.inputLabel}
                  >
                    Select group type
                  </Typography>
                </InputLabel>
                <Field
                  id="group-type-input"
                  component={TextField}
                  select
                  name="type"
                  fullWidth
                  SelectProps={{
                    classes: {
                      root: classes.selectRoot,
                      select: classes.selectElem,
                      icon: classes.selectIcon,
                    },
                    IconComponent: KeyboardArrowUp,
                  }}
                >
                  {groupTypes.map(type => (
                    <MenuItem key={type.key} value={type.key}>
                      {type.value}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Create group
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {table}
    </>
  )
}

const styles = theme => ({
  newGroup: {
    marginBottom: theme.spacing(4),
  },
  actionButton: {
    marginRight: theme.spacing(2),
  },

  // TODO: Move these to a generic field component shared with modal, criterion part, etc
  inputLabel: {
    color: theme.palette.primary.dark,
    fontWeight: 700,
    marginTop: theme.spacing(1),
  },
  selectRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  selectElem: {
    flexGrow: 1,
  },
  selectIcon: {
    color: theme.palette.secondary.main,
  },
})

export default withStyles(styles)(UserGroups)
