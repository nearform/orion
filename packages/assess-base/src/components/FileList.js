import React from 'react'
import { Grid, Typography, withStyles } from '@material-ui/core'
import { useMutation } from 'graphql-hooks'
import T from 'prop-types'
import { useTranslation } from 'react-i18next'

import { uploadFile } from '../utils/storage'
import { createFileUploadMutation } from '../queries'
import UploadButton from './UploadButton'
import FileItem from './FileItem'
import { fileType } from '../prop-types'

function FileList({
  theme,
  classes,
  assessmentId,
  pillar,
  criterion,
  partNumber,
  userId,
  files,
  canUpload,
  onUploadComplete,
}) {
  const [createFileUpload] = useMutation(createFileUploadMutation)
  const { t } = useTranslation()

  async function createNewFileUpload(file, s3Key) {
    const { error } = await createFileUpload({
      variables: {
        fileUploadData: {
          user_id: userId,
          assessment_id: assessmentId,
          pillar_key: pillar.key,
          criterion_key: criterion.key,
          part_number: partNumber,
          file_name: file.name,
          file_size: file.size,
          s3_key: s3Key,
        },
      },
    })

    if (error) throw error
  }

  async function handleFileUpload(file) {
    const { key: s3Key } = await uploadFile(file, assessmentId)
    await createNewFileUpload(file, s3Key)

    onUploadComplete()
  }

  const listFiles = files => {
    const list = []

    for (let i = 0; i < files.length; i += 2) {
      list.push(
        <Grid item>
          <div className={classes.fileItemWrapper}>
            {i + 1 < files.length && (
              <FileItem
                file={files[i + 1]}
                canDelete={canUpload}
                onDeleteComplete={onUploadComplete}
              />
            )}
            <FileItem
              file={files[i]}
              canDelete={canUpload}
              onDeleteComplete={onUploadComplete}
            />
          </div>
        </Grid>
      )
    }

    return list
  }

  return (
    <Grid
      container
      xs={6}
      alignItems="flex-end"
      direction="column"
      spacing={2}
      wrap="nowrap"
      className={classes.fileList}
    >
      <Grid item>
        <div className={classes.fileItemWrapper}>
          <Typography
            variant="h4"
            color="textSecondary"
            className={classes.text}
          >
            {t('Supporting documentation')}
          </Typography>
        </div>
      </Grid>
      {listFiles(files)}
      {canUpload && (
        <Grid item>
          <UploadButton
            onFileSelected={handleFileUpload}
            color="secondary"
            variant="outlined"
          >
            Upload
          </UploadButton>
        </Grid>
      )}
    </Grid>
  )
}

FileList.propTypes = {
  theme: T.object.isRequired,
  assessmentId: T.number.isRequired,
  pillar: T.object.isRequired,
  criterion: T.object.isRequired,
  partNumber: T.number,
  userId: T.any.isRequired,
  files: T.arrayOf(fileType).isRequired,
  canUpload: T.bool.isRequired,
  onUploadComplete: T.func.isRequired,
}

const styles = theme => ({
  fileList: {
    float: 'right',
  },
  fileItemWrapper: {
    display: 'flex',
  },
  text: {
    paddingLeft: theme.spacing(1),
  },
})

export default withStyles(styles, { withTheme: true })(FileList)
