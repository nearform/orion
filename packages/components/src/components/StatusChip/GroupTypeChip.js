import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import T from 'prop-types'

import StatusChip from './StatusChip'

export const GROUP_TYPES = {
  company: 'company',
  partner: 'partner',
  platform: 'platform',
}

function getChipColor(status) {
  return GROUP_TYPES[status] === GROUP_TYPES.partner ? 'secondary' : 'default'
}

function GroupTypeChip({ classes, status }) {
  return (
    <StatusChip chipColor={getChipColor(status)}>
      <Typography variant="h4" className={classes.groupType}>
        {GROUP_TYPES[status] || 'no type'}
      </Typography>
    </StatusChip>
  )
}

GroupTypeChip.propTypes = {
  classes: T.object.isRequired,
  status: T.oneOf(Object.keys(GROUP_TYPES)),
}

const styles = theme => ({
  groupType: {
    textTransform: 'none',
    color: theme.palette.primary.dark,
    padding: theme.spacing(0.5, 0),
  },
})

export default withStyles(styles)(GroupTypeChip)
