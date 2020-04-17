import React, { useState, useRef, useEffect } from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Link } from '@reach/router'
import { useMutation } from 'graphql-hooks'
import updatePageTitleMutation from '../../queries/update-page-title.graphql'

const useStyles = makeStyles(theme => ({
  label: {
    color: theme.palette.common.white,
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'baseline',

    '& a': {
      color: theme.palette.common.white,
      display: 'block',
      overflow: 'hidden',
      textDecoration: 'none',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  editButton: {
    minWidth: 'auto',
  },
  editButtonIcon: {
    color: theme.palette.tertiary.main,
  },
  edit: {
    padding: '5px 15px',
    marginLeft: '-15px',
    flex: 1,
    overflow: 'hidden',
  },
  editForm: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: 40,
  },
  editInput: {
    fontSize: 16,
    fontWeight: 'bold',
    background: 'none',
    border: 'none',
    color: theme.palette.common.white,
    outlineColor: theme.palette.action.light,
    padding: '7.5px 57px 8px 12px',
    marginLeft: '-11.5px',
    fontFamily: theme.typography.fontFamily,
    width: 'calc(100% + 15px)',
  },
  editSaveButton: {
    position: 'absolute',
    right: 0,
    border: 'none',
    height: '38px',
    background: theme.palette.action.main,
    width: '45px',
    borderRadius: '0 3px 3px 0',
  },
  editSaveButtonIcon: {
    fontSize: '21px',
    color: theme.palette.common.white,
  },
}))

const TreeViewLink = ({ title: initialTitle, to, pageId }) => {
  const classes = useStyles()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const ref = useRef(null)
  const [updatePageTitle] = useMutation(updatePageTitleMutation)
  const saveTitle = async e => {
    e.preventDefault()
    setIsEditing(false)
    try {
      await updatePageTitle({
        variables: {
          id: pageId,
          title,
        },
      })
    } catch (error) {
      console.warn(
        `There was an error making changes to the title of page ${pageId} because of the following error. ${error.message}`
      )
      setTitle(initialTitle)
    }
  }

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus()
    }
  }, [isEditing, ref])

  return isEditing ? (
    <div className={classes.edit}>
      <form className={classes.editForm} onSubmit={saveTitle}>
        <input
          ref={ref}
          type="text"
          value={title}
          className={classes.editInput}
          onChange={e => {
            setTitle(e.target.value)
          }}
          onBlur={() => {
            setIsEditing(false)
            setTitle(initialTitle)
          }}
        />
        <button type="submit" className={classes.editSaveButton}>
          <i className={`fa fa-save ${classes.editSaveButtonIcon}`} />
        </button>
      </form>
    </div>
  ) : (
    <div className={classes.label}>
      <Link to={to}>{title}</Link>
      <Button className={classes.editButton} onClick={() => setIsEditing(true)}>
        <i className={`fa fa-pen ${classes.editButtonIcon}`} />
      </Button>
    </div>
  )
}

export default TreeViewLink
