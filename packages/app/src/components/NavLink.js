import React from 'react'
import { Link } from '@reach/router'
import { withStyles } from '@material-ui/core'

function NavLink({ partial = true, classes, ...props }) {
  return (
    <Link
      {...props}
      getProps={({ isCurrent, isPartiallyCurrent }) => {
        const isActive = partial ? isPartiallyCurrent : isCurrent
        return {
          className: isActive ? classes.active : classes.inactive,
        }
      }}
    />
  )
}

const styles = theme => ({
  active: {
    color: theme.palette.primary.main,
  },
  inactive: {
    color: theme.palette.secondary.main,
  },
})

export default withStyles(styles)(NavLink)
