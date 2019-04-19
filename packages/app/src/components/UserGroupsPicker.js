import React, { useState } from 'react'
import T from 'prop-types'
import { useQuery, useMutation } from 'graphql-hooks'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  Button,
  Typography,
  MenuItem,
} from '@material-ui/core'

const getGroups = `query getGroups {
  group {
    id
    name
  }
}`

const applyUserGroupChangeMutation = `
mutation updateUserGroup($userId: Int!, $groupId: Int!) {
  update_user(where: {id: {_eq: $userId}}, _set: {pending: false}) {
    affected_rows
  }
  update_user_group(where: {user_id: {_eq: $userId}}, _set: {group_id: $groupId}) {
    affected_rows
  }
}
`

const insertUserGroupMutation = `
mutation insertUserGroup($userId: Int!, $groupId: Int!) {
  insert_user_group(objects: {user_id: $userId, group_id: $groupId}) {
    affected_rows
  }
}
`

function UserGroupsPicker({ selected: user, onClose, onApply }) {
  const [currentGroupId, setGroupId] = useState('')
  const [currentError, setError] = useState(null)

  const handleClose = fn => {
    if (typeof fn === 'function') {
      fn()
    }
  }
  const { loading: groupsLoading, error: groupsError, data } = useQuery(
    getGroups
  )
  const groups = data ? data.group || [] : []

  const [applyUserGroupChange] = useMutation(applyUserGroupChangeMutation)
  const [applyInsertUserGroup] = useMutation(insertUserGroupMutation)

  const doApplyGroupChange = async (userId, groupId) =>
    applyUserGroupChange({ variables: { userId, groupId } })
  const doInsertUserGroup = async (userId, groupId) =>
    applyInsertUserGroup({ variables: { userId, groupId } })
  const handleApplyGroup = async fn => {
    try {
      const { data, error } = await doApplyGroupChange(user.id, currentGroupId)
      if (error) {
        return setError(error)
      }
      if (
        data &&
        data.update_user_group &&
        data.update_user_group.affected_rows === 0
      ) {
        // if update failed it means there was no entry for user before so we need to add it
        const { error } = await doInsertUserGroup(user.id, currentGroupId)
        if (error) {
          return setError(error)
        }
      }
      handleClose(fn)
    } catch (error) {
      setError(error)
    }
  }

  if (!user) return null

  return (
    <div>
      <Dialog open={!!user} onClose={() => handleClose(onClose)}>
        <DialogTitle>Assign a group to {user.name}</DialogTitle>
        <DialogContent>
          {(groupsError || currentError) && (
            <Typography variant="subtitle1">
              There was an error performing the request.
            </Typography>
          )}

          {!groupsError && groupsLoading && (
            <Typography variant="subtitle1">
              Loading available groups...
            </Typography>
          )}

          {!groupsError && !groupsLoading && groups && groups.length && (
            <Select
              value={currentGroupId}
              onChange={event => setGroupId(Number(event.target.value))}
            >
              {groups.map((group, i) => (
                <MenuItem key={i} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(onClose)} color="primary">
            {groupsLoading || groupsError ? 'Close' : 'Cancel'}
          </Button>
          {!groupsLoading && !groupsError && groups && (
            <Button
              disabled={!currentGroupId}
              onClick={() => handleApplyGroup(onApply)}
              color="primary"
            >
              Apply
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

UserGroupsPicker.propTypes = {
  user: T.shape({
    id: T.number,
    name: T.string,
  }),
  onClose: T.func,
  onApply: T.func,
}

export default UserGroupsPicker
