import React from 'react'
import { withStyles, Chip, Typography } from '@material-ui/core'
import T from 'prop-types'
import { fade } from '@material-ui/core/styles/colorManipulator'

import TuneIcon from '@material-ui/icons/Tune'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DoneIcon from '@material-ui/icons/Done'

export const ASSESSMENT_STATUS = {
  submitted: 'submitted',
  inProgress: 'in-progress',
  closed: 'closed',
}

function getChipColor(status) {
  switch (status) {
    case ASSESSMENT_STATUS.submitted:
      return 'secondary'
    case ASSESSMENT_STATUS.inProgress:
      return 'primary'
    case ASSESSMENT_STATUS.closed:
    default:
      return 'default'
  }
}

function getIconDetails(status) {
  switch (status) {
    case ASSESSMENT_STATUS.submitted:
      return [DoneIcon, 'secondary']
    case ASSESSMENT_STATUS.inProgress:
      return [MoreHorizIcon, 'primary']
    case ASSESSMENT_STATUS.closed:
    default:
      return [TuneIcon, 'inherit']
  }
}

function AssessmentStatusChip({ classes, status }) {
  const [Icon, color] = getIconDetails(status)

  return (
    <Chip
      classes={classes}
      label={
        <>
          <Typography variant="body2">{status}</Typography>
          <Icon fontSize="small" color={color} />
        </>
      }
      color={getChipColor(status)}
    />
  )
}

AssessmentStatusChip.propTypes = {
  classes: T.object.isRequired,
  status: T.oneOf(Object.values(ASSESSMENT_STATUS)).isRequired,
}

const styles = theme => ({
  root: {
    height: 'auto',
    backgroundColor: fade(theme.palette.primary.dark, 0.1),
    color: theme.palette.text.primary,
  },
  colorPrimary: {
    backgroundColor: fade(theme.palette.primary.light, 0.1),
  },
  colorSecondary: {
    backgroundColor: fade(theme.palette.secondary.dark, 0.1),
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    '& > * + * ': {
      marginLeft: theme.spacing(1),
    },
  },
})

export default withStyles(styles)(AssessmentStatusChip)
