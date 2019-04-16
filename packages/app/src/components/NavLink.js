import React from 'react'
import { Link as RouterLink } from '@reach/router'
import { withStyles } from '@material-ui/core'
import classnames from 'classnames'

function NavLink({ partial = true, classes, className, ...props }) {
  return (
    <RouterLink
      getProps={({ isCurrent, isPartiallyCurrent }) => {
        const isActive = partial ? isPartiallyCurrent : isCurrent
        return {
          className: classnames(className, { [classes.active]: isActive }),
        }
      }}
      {...props}
    />
  )
}

const styles = theme => ({
  active: {
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 2,
      backgroundColor: theme.palette.secondary.main,
    },
  },
})

export default withStyles(styles)(NavLink)
