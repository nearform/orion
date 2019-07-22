import React, { useEffect, useState } from 'react'
import { UserAvatar } from 'components'
import { getUsers } from '../queries'
import CloseIcon from '@material-ui/icons/Close'
import FilterListIcon from '@material-ui/icons/FilterList'
import debounce from 'lodash/debounce'
import QueryTable from './QueryTable'

import {
  Typography,
  withStyles,
  Button,
  IconButton,
  Input,
  TableRow,
  TableCell,
  Modal,
} from '@material-ui/core'

const headers = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'select', label: '', sortable: true },
]

function SelectAuthors({ classes, selectedUsers, onChange }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [cachedSelectedUser, setCachedSelectedUsers] = useState(selectedUsers)
  const [filter, setFilter] = useState()
  useEffect(() => {
    setCachedSelectedUsers(selectedUsers)
  }, [selectedUsers])

  useEffect(() => {
    onChange(cachedSelectedUser)
  }, [cachedSelectedUser])

  function addUser(author) {
    setCachedSelectedUsers([...cachedSelectedUser, { author }])
  }

  function removeUser(userId) {
    setCachedSelectedUsers(
      cachedSelectedUser.filter(({ author }) => author.id !== userId)
    )
  }

  const queryVariables = {}
  if (filter) {
    //implement fuzzy search:
    //https://docs.hasura.io/1.0/graphql/manual/queries/custom-functions.html#example-fuzzy-match-search-functions
    queryVariables.where = {
      email: { _ilike: `%${filter}%` },
    }
  }

  const handleFilterChange = debounce(value => {
    setFilter(value)
  }, 400)

  function handleClose() {
    //todo save/draft
    setModalOpen(false)
    setFilter(null)
  }
  return (
    <>
      <Button
        className={classes.openButton}
        variant="outlined"
        color="secondary"
        onClick={() => setModalOpen(true)}
      >
        Set Authors
      </Button>
      <Modal
        style={{ outline: 'none' }}
        onClose={handleClose}
        open={isModalOpen}
      >
        <div className={classes.modal}>
          <Typography variant="h1">Set Authors</Typography>
          <div className={classes.userList}>
            {cachedSelectedUser.map(({ author }) => (
              <div key={author.id}>
                <UserAvatar user={author} />
                <IconButton
                  className={classes.removeAuthorButton}
                  onClick={() => removeUser(author.id)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            ))}
          </div>
          <div className={classes.filter}>
            <Typography color="secondary" variant="h4">
              Filter
            </Typography>
            <Input
              endAdornment={<FilterListIcon color="secondary" />}
              onChange={e => handleFilterChange(e.target.value)}
            />
          </div>
          <div className={classes.tableContainer}>
            <QueryTable
              testid="assessments-table"
              headers={headers}
              query={getUsers}
              variables={queryVariables}
              orderBy={{ id: 'desc' }}
              pageSizes={[10]}
              renderTableBody={data => {
                return data.user.map(user => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.first_name} {user.last_name}
                      </TableCell>
                      <TableCell>
                        <Typography>{user.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          variant="outlined"
                          disabled={cachedSelectedUser.some(
                            ({ author }) => user.id === author.id
                          )}
                          onClick={() => addUser(user)}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default withStyles(theme => ({
  openButton: {
    marginTop: theme.spacing(2),
  },
  tableContainer: {
    minHeight: '620px',
  },
  removeAuthorButton: {
    '& svg': {
      width: '1rem',
      height: '1rem',
    },
  },
  userList: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(-0.5),
    marginTop: theme.spacing(2.5),
    '&>div': {
      display: 'flex',
      backgroundColor: theme.articleTypography.input.backgroundColor,
      borderRadius: '20px',
      margin: theme.spacing(0.5),
    },
  },
  filter: {
    '&>h4': {
      marginBottom: theme.spacing(0.5),
    },
    '& input': {
      minWidth: '250px',
    },
    '&>div': {
      paddingRight: theme.spacing(0.5),
    },
  },
  modal: {
    width: '60%',
    padding: theme.spacing(2),
    position: 'absolute',
    top: `50%`,
    borderRadius: '3px',
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    backgroundColor: 'white',
    outline: 'none',
    '&>*:not(:first-child)': {
      marginTop: theme.spacing(3),
    },
  },
}))(SelectAuthors)
