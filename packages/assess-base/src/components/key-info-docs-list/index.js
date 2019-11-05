import React from 'react'
import { Box, Typography, withStyles } from '@material-ui/core'
import T from 'prop-types'
import { useTranslation } from 'react-i18next'

import FileItem from '../FileItem'
import HeadedAsidePanel from '../headed-aside-panel'

const KeyInfoDocsList = ({
  assessment,
  classes,
  onFileDelete,
  canDeleteFile = false,
}) => {
  const { t } = useTranslation()
  return (
    <HeadedAsidePanel title={t('Assessment Documents')}>
      {assessment && assessment.files.length ? (
        <Box className={classes.list} component="ul">
          {assessment.files.map(file => (
            <Box className={classes.listItem} component="li" key={file.s3_key}>
              <FileItem
                file={file}
                canDelete={canDeleteFile}
                onDeleteComplete={onFileDelete}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>
          {t(`You'll find an index of uploaded documents for your assessment in this
          area`)}
        </Typography>
      )}
    </HeadedAsidePanel>
  )
}

KeyInfoDocsList.propTypes = {
  assessment: T.object,
  classes: T.object.isRequired,
  onFileDelete: T.func.isRequired,
  canDeleteFile: T.bool,
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
