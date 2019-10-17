import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import T from 'prop-types'
import { useTranslation } from 'react-i18next'

import StatusChip from './StatusChip'
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

function AssessmentStatusChip({ status, classes }) {
  const [Icon, color] = getIconDetails(status)
  const { t } = useTranslation()

  return (
    <StatusChip
      IconComponent={Icon}
      iconColor={color}
      chipColor={getChipColor(status)}
    >
      <Typography variant="h4" className={classes.status}>
        {t(status)}
      </Typography>
    </StatusChip>
  )
}

AssessmentStatusChip.propTypes = {
  status: T.oneOf(Object.values(ASSESSMENT_STATUS)).isRequired,
  classes: T.object,
}

const styles = theme => ({
  status: {
    textTransform: 'none',
    color: theme.palette.primary.dark,
    padding: theme.spacing(0.5, 0),
  },
})

export default withStyles(styles)(AssessmentStatusChip)
