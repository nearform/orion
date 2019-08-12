import React from 'react'
import T from 'prop-types'
import { StarRate } from '@material-ui/icons'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core'

const Star = ({
  filled,
  active,
  disabled,
  onHover: onMouseEnter = () => {},
  onClick = () => {},
  classes,
}) => (
  <StarRate
    {...(!disabled &&
      active && {
        onMouseEnter,
        onClick,
      })}
    className={classnames([
      classes.star,
      {
        [classes.filled]: filled && !active,
        [classes.active]: active,
        [classes.activeFilled]: active && filled,
        [classes.disabled]: disabled,
      },
    ])}
  />
)

Star.propTypes = {
  filled: T.bool,
  active: T.bool,
  disabled: T.bool,
  onHover: T.func,
  onClick: T.func,
  classes: T.object.isRequired,
}

export default withStyles(theme => ({
  star: {
    width: 19,
    height: 19,
    color: theme.articleRateIconColor.empty,
    '&:first-child': {
      marginLeft: '-0.2em',
    },
  },
  filled: {
    color: theme.articleRateIconColor.filled,
  },
  active: {
    color: theme.palette.tertiary.light,
    cursor: 'pointer',
  },
  activeFilled: {
    color: theme.palette.secondary.main,
  },
  disabled: {
    cursor: 'default',
  },
}))(Star)
