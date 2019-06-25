import React from 'react'
import T from 'prop-types'
import { withStyles } from '@material-ui/core'
import classnames from 'classnames'

function getNavLink(RouterLink) {
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

  NavLink.displayName = 'NavLink'
  NavLink.defaultProps = {
    partial: true,
  }
  NavLink.propTypes = {
    partial: T.bool,
    classes: T.object,
    className: T.string,
    to: T.string,
    children: T.node,
  }

  return withStyles(styles)(NavLink)
}

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

export default getNavLink
