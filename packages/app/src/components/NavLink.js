import React from 'react'
import { Link as RouterLink } from '@reach/router'
import { withStyles } from '@material-ui/core'
import classnames from 'classnames'

const NavLink = React.forwardRef(
  ({ partial = true, classes, className, to, children, ...props }, ref) => {
    // It is intended to be an external link
    if (/^https?:\/\//.test(to))
      return (
        <a href={to} className={className} {...props} ref={ref}>
          {children}
        </a>
      )

    // It is an internal link
    return (
      <RouterLink
        to={to}
        getProps={({ isCurrent, isPartiallyCurrent }) => {
          const isActive = partial ? isPartiallyCurrent : isCurrent
          return {
            className: classnames(className, {
              [classes.active]: isActive,
            }),
          }
        }}
        {...props}
        ref={ref}
      >
        {children}
      </RouterLink>
    )
  }
)

const styles = theme => ({
  active: {
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -8,
      height: 8,
      backgroundColor: theme.palette.secondary.main,
    },
  },
})

export default withStyles(styles)(NavLink)
