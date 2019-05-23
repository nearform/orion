import React from 'react'
import { Grid, Typography, Button, withStyles } from '@material-ui/core'
import { useMutation } from 'graphql-hooks'
import T from 'prop-types'

import { uploadFile, downloadFile } from '../utils/storage'
import { createFileUploadMutation } from '../queries'
import UploadButton from './UploadButton'

function FileList({
  theme,
  assessmentId,
  pillar,
  criterion,
  partNumber,
  userId,
  files,
  onUploadComplete,
}) {
  const [createFileUpload] = useMutation(createFileUploadMutation)

  async function createNewFileUpload(fileName, s3Key) {
    const { error } = await createFileUpload({
      variables: {
        fileUploadData: {
          user_id: userId,
          assessment_id: assessmentId,
          pillar_key: pillar.key,
          criterion_key: criterion.key,
          part_number: partNumber,
          file_name: fileName,
          s3_key: s3Key,
        },
      },
    })

    if (error) throw error
  }

  async function handleFileUpload(file) {
    const { key: s3Key } = await uploadFile(file, assessmentId)
    await createNewFileUpload(file.name, s3Key)

    onUploadComplete()
  }

  return (
    <Grid
      container
      alignItems="center"
      spacing={theme.spacing.unit * 2}
      wrap="nowrap"
    >
      <Grid item>
        <Typography variant="h4" color="textSecondary">
          Supporting documentation
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={theme.spacing.unit}>
          {files.map(file => (
            <Grid item key={file.s3_key}>
              <Button variant="text" onClick={_ => downloadFile(file)}>
                {file.file_name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <UploadButton
          onFileSelected={handleFileUpload}
          color="secondary"
          variant="outlined"
        >
          Upload
        </UploadButton>
      </Grid>
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
  files: T.array.isRequired,
  onUploadComplete: T.func.isRequired,
}

const styles = {}

export default withStyles(styles, { withTheme: true })(FileList)
