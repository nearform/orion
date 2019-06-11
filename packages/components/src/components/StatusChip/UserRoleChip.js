import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import T from 'prop-types'

import StatusChip from './StatusChip'

export const ROLE_STATUS = {
  admin: 'admin',
  none: 'non-member',
}

function getChipColor(status) {
  return status === ROLE_STATUS.admin ? 'secondary' : 'default'
}

function UserRoleChip({ classes, status }) {
  return (
    <StatusChip chipColor={getChipColor(status)}>
      <Typography variant="h4" className={classes.userRole}>
        {status}
      </Typography>
    </StatusChip>
  )
}

UserRoleChip.propTypes = {
  classes: T.object.isRequired,
  status: T.oneOf(Object.values(ROLE_STATUS)).isRequired,
}

const styles = theme => ({
  userRole: {
    textTransform: 'none',
    color: theme.palette.primary.dark,
    padding: theme.spacing(0.5, 0),
  },
})

export default withStyles(styles)(UserRoleChip)
