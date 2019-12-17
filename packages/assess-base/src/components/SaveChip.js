import React from 'react'
import T from 'prop-types'
import {
  Typography,
  withStyles,
  Chip,
  CircularProgress,
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'

function SavedChip({ dirty, classes }) {
  const { t } = useTranslation()

  return (
    <Chip
      size="small"
      label={
        dirty ? (
          <>
            <Typography variant="h4" className={classes.text}>
              {t('Saving')}
            </Typography>
            <div className={classes.container}>
              <CircularProgress
                size={14}
                thickness={5}
                className={classes.progress}
                color="inherit"
              />
            </div>
          </>
        ) : (
          <>
            <Typography variant="h4" className={classes.text}>
              {t('Saved')}
            </Typography>
            <DoneIcon />
          </>
        )
      }
      className={classnames(classes.root, { [classes.something]: dirty })}
    />
  )
}

SavedChip.propTypes = {
  classes: T.object,
  dirty: T.bool.isRequired,
}

const styles = theme => ({
  root: {
    height: '24px',
    width: '100px',
    backgroundColor: 'rgb(121, 204, 198)',
    color: 'white',
  },
  something: {
    // cant use theme because parent opacity would hide font color
    backgroundColor: 'rgb(121, 204, 198, 0.15)',
    color: theme.palette.secondary.main,
  },
  text: {
    fontSize: '12px',
    fontWeight: 900,
    textTransform: 'none',
    paddingLeft: '10px',
    marginRight: '6px',
  },
  container: {
    width: '24px',
    height: '24px',
    textAlign: 'center',
  },
  progress: {
    textAlign: 'inline-block',
    marginTop: '5px',
  },
})

export default withStyles(styles, { withTheme: true })(SavedChip)
