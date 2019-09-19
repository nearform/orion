import React from 'react'
import { Box, Typography, withStyles } from '@material-ui/core'
import T from 'prop-types'

import FileItem from '../FileItem'

const KeyInfoDocsList = ({ assessmentData, classes }) => {
  return (
    <Box className={classes.list} component="aside">
      <Typography className={classes.heading} variant="h3">
        Assessment Reports
      </Typography>
      <Box className={classes.list} component="ul">
        {assessmentData &&
          assessmentData.files.map(file => (
            <Box className={classes.listItem} component="li" key={file.s3_key}>
              <FileItem file={file} />
            </Box>
          ))}
      </Box>
    </Box>
  )
}

KeyInfoDocsList.propTypes = {
  assessmentData: T.array.isRequired,
  classes: T.object.isRequired,
}

const styles = theme => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
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
