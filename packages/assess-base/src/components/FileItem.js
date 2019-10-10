import React, { useState } from 'react'
import { Button, withStyles, Typography } from '@material-ui/core'
import AttachmentIcon from '@material-ui/icons/Attachment'
import DeleteIcon from '@material-ui/icons/Delete'
import T from 'prop-types'
import isNumber from 'lodash/isNumber'
import { useMutation } from 'graphql-hooks'

import { ConfirmDialog } from 'components'
import { downloadFile, deleteFile } from '../utils/storage'
import { fileType } from '../prop-types'
import { deleteFileUploadMutation } from '../queries'

// adapted from https://gist.github.com/lanqy/5193417
function formatFileSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return `0 ${sizes[0]}`
  const k = 1024
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10)
  if (i == 0) return bytes + ' ' + sizes[i]
  return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i]
}

function FileItem({ classes, file, canDelete, onDeleteComplete }) {
  const [show, setShow] = useState(false)

  const [deleteFileUpload] = useMutation(deleteFileUploadMutation)

  const doDeleteFile = async key => {
    await deleteFile(key)
    await deleteFileUpload({ variables: { s3Key: key } })
    onDeleteComplete()
  }

  return (
    <Button
      onClick={_ => downloadFile(file)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <AttachmentIcon className={classes.attachmentIcon} />
      <div className={classes.attachment}>
        <Typography variant="h4">{file.file_name}</Typography>
        {isNumber(file.file_size) && (
          <Typography variant="h4" color="secondary">
            {formatFileSize(file.file_size)}
          </Typography>
        )}
      </div>
      {canDelete && (
        <div
          onClick={e => e.stopPropagation()}
          className={show ? classes.visible : classes.hidden}
        >
          <ConfirmDialog
            title={`Delete File “${file.file_name}”?`}
            text="This file will be permanently deleted. This cannot be undone."
            onConfirm={_ => doDeleteFile(file.s3_key)}
            onCancel={_ => setShow(false)}
            okayLabel="Delete"
          >
            <DeleteIcon className={classes.actionButton} />
          </ConfirmDialog>
        </div>
      )}
    </Button>
  )
}

FileItem.propTypes = {
  classes: T.object.isRequired,
  file: fileType.isRequired,
  canDelete: T.bool.isRequired,
  onDeleteComplete: T.func,
}

const styles = theme => ({
  attachmentIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.light,
  },
  attachment: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  actionButton: {
    marginLeft: theme.spacing(2),
    color: '#9cafc3',
  },
  hidden: {
    opacity: '0',
    transition: 'opacity 250ms ease-out',
    '-moz-transition': 'opacity 250ms ease-out',
    '-webkit-transition': 'opacity 250ms ease-out',
    '-o-transition': 'opacity 250ms ease-out',
  },
  visible: {
    opacity: '1',
    transition: 'opacity 250ms ease-in',
    '-moz-transition': 'opacity 250ms ease-in',
    '-webkit-transition': 'opacity 250ms ease-in',
    '-o-transition': 'opacity 250ms ease-in',
  },
})

export default withStyles(styles)(FileItem)
