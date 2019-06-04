import React from 'react'
import { Button, withStyles, Typography } from '@material-ui/core'
import AttachmentIcon from '@material-ui/icons/Attachment'
import T from 'prop-types'
import isNumber from 'lodash/isNumber'

import { downloadFile } from '../utils/storage'
import { fileType } from '../prop-types'

// adapted from https://gist.github.com/lanqy/5193417
function formatFileSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return `0 ${sizes[0]}`
  const k = 1024
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10)
  if (i == 0) return bytes + ' ' + sizes[i]
  return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i]
}

function FileItem({ classes, file }) {
  return (
    <Button onClick={_ => downloadFile(file)}>
      <AttachmentIcon className={classes.attachmentIcon} />
      <div className={classes.attachment}>
        <Typography variant="h4">{file.file_name}</Typography>
        {isNumber(file.file_size) && (
          <Typography variant="h4" color="secondary">
            {formatFileSize(file.file_size)}
          </Typography>
        )}
      </div>
    </Button>
  )
}

FileItem.propTypes = {
  classes: T.object.isRequired,
  file: fileType.isRequired,
}

const styles = theme => ({
  attachmentIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.secondary.light,
  },
  attachment: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})

export default withStyles(styles)(FileItem)
