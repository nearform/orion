import React from 'react'
import { Button, withStyles, Typography } from '@material-ui/core'
import AttachmentIcon from '@material-ui/icons/Attachment'
import T from 'prop-types'

import { downloadFile } from '../utils/storage'
import { fileType } from '../prop-types'

function FileItem({ classes, file }) {
  return (
    <Button onClick={_ => downloadFile(file)}>
      <AttachmentIcon className={classes.attachmentIcon} />
      <div className={classes.attachment}>
        <Typography variant="h4">{file.file_name}</Typography>
        <Typography variant="h4" color="secondary">
          2 MB
        </Typography>
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
    marginRight: theme.spacing.unit,
    color: theme.palette.secondary.light,
  },
  attachment: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})

export default withStyles(styles)(FileItem)
