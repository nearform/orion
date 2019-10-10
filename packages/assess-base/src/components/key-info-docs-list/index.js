import React from 'react'
import { Box, Typography, withStyles } from '@material-ui/core'
import T from 'prop-types'

import FileItem from '../FileItem'
import HeadedAsidePanel from '../headed-aside-panel'

const KeyInfoDocsList = ({ assessment, classes, onFileDelete }) => {
  return (
    <HeadedAsidePanel title="Assessment Documents">
      {assessment && assessment.files.length ? (
        <Box className={classes.list} component="ul">
          {assessment.files.map(file => (
            <Box className={classes.listItem} component="li" key={file.s3_key}>
              <FileItem
                file={file}
                canDelete={true}
                onDeleteComplete={onFileDelete}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>
          You'll find an index of uploaded documents for your assessment in this
          area
        </Typography>
      )}
    </HeadedAsidePanel>
  )
}

KeyInfoDocsList.propTypes = {
  assessment: T.object,
  classes: T.object.isRequired,
  onFileDelete: T.func.isRequired,
}

const styles = theme => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
  },
  listItem: {
    listStyle: 'none',
    marginBottom: theme.spacing(1),
    marginLeft: '-8px',
  },
})

export default withStyles(styles)(KeyInfoDocsList)
