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
    case ASSESSMENT_STATUS.closed:
      return 'default'
    case ASSESSMENT_STATUS.inProgress:
    default:
      return 'primary'
  }
}

function getIconColor(status) {
  switch (status) {
    case ASSESSMENT_STATUS.submitted:
      return 'secondary'
    case ASSESSMENT_STATUS.inProgress:
      return 'secondary'
    case ASSESSMENT_STATUS.closed:
    default:
      return 'inherit'
  }
}

function getIcon(status) {
  switch (status) {
    case ASSESSMENT_STATUS.submitted:
      return DoneIcon
    case ASSESSMENT_STATUS.closed:
      return TuneIcon
    case ASSESSMENT_STATUS.inProgress:
    default:
      return MoreHorizIcon
  }
}

function AssessmentStatusChip({ classes, status }) {
  const Icon = getIcon(status)

  return (
    <Chip
      classes={classes}
      label={
        <>
          <Typography variant="body1">{status}</Typography>
          <Icon fontSize="small" color={getIconColor(status)} />
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
    display: 'flex',
    backgroundColor: fade(theme.palette.primary.dark, 0.1),
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
      marginLeft: theme.spacing.unit,
    },
  },
})

export default withStyles(styles)(AssessmentStatusChip)
