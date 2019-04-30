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

import {
  addUserGroupMutation,
  getGroups,
  assignUserGroupMutation,
} from '../queries'

function UserGroupsPicker({ selected: user, onClose, onApply }) {
  const [currentGroupId, setGroupId] = useState('')
  const [currentError, setError] = useState(null)

  const handleClose = fn => {
    if (typeof fn === 'function') {
      fn()
    }
  }
  const { loading: groupsLoading, error: groupsError, data } = useQuery(
    getGroups,
    { variables: { orderBy: { id: 'asc' } } }
  )
  const groups = data ? data.group || [] : []

  const [applyUserGroupChange] = useMutation(assignUserGroupMutation)
  const [applyInsertUserGroup] = useMutation(addUserGroupMutation)

  const doApplyGroupChange = async (userId, groupId) =>
    applyUserGroupChange({
      variables: { userId, groupId, orderBy: { id: 'asc' } },
    })
  const doInsertUserGroup = async (userId, groupId) =>
    applyInsertUserGroup({
      variables: { userId, groupId, orderBy: { id: 'asc' } },
    })
  const handleApplyGroup = async fn => {
    try {
      const { data, error } = await doApplyGroupChange(user.id, currentGroupId)
      if (error) {
        setError(error)
        return
      }
      if (
        data &&
        data.update_user_group &&
        data.update_user_group.affected_rows === 0
      ) {
        // if update failed it means there was no entry for user before so we need to add it
        const { error } = await doInsertUserGroup(user.id, currentGroupId)
        if (error) {
          setError(error)
          return
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
  selected: T.shape({
    id: T.number,
    name: T.string,
  }),
  onClose: T.func,
  onApply: T.func,
}

export default UserGroupsPicker
