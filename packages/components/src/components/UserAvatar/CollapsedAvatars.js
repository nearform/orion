import React, { useState } from 'react'
import { withStyles, Button } from '@material-ui/core'
import classnames from 'classnames'
import T from 'prop-types'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'

import AvatarImage from './AvatarImage'
import { userPropTypes } from './utils'

const CollapsedAvatars = ({ users, label, onClick, isOpen, classes }) => (
  <Button
    onClick={() => onClick(!isOpen)}
    classes={{
      root: classnames(classes.root, { [classes.isOpen]: isOpen }),
      label: classes.label,
    }}
  >
    {users.map(user => (
      <span
        className={classes.avatarWrapper}
        key={`collapsed_user_${user.email}`}
      >
        <AvatarImage user={user} className={classes.avatarImage} />
      </span>
    ))}
    <span className={classes.buttonText}>{label}</span>
    <KeyboardArrowDown className={classes.openIcon} />
  </Button>
)
CollapsedAvatars.defaultProps = {
  isOpen: false,
}
CollapsedAvatars.propTypes = {
  classes: T.object.isRequired,
  users: T.arrayOf(T.shape(userPropTypes)).isRequired,
  label: T.string.isRequired,
  onClick: T.func.isRequired,
  isOpen: T.bool,
  classes: T.object.isRequired,
}
export default withStyles(theme => ({
  root: {
    width: `calc(100% + ${theme.spacing(2)}px)`,
    marginLeft: theme.spacing(-1),
  },
  isOpen: {
    marginBottom: theme.spacing(2),
    '& $openIcon': {
      fill: theme.palette.secondary.main,
      transform: 'rotate(180deg)',
    },
  },
  openIcon: {
    fill: theme.palette.text.secondary,
    transform: 'rotate(0deg)',
    transitionDuration: '0.4s',
    transitionProperty: 'transform',
    verticalAlign: 'middle',
    margin: theme.spacing(0, 1),
  },
  label: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatarWrapper: {
    maxWidth: '2px', // Allow overlap, showing at least just inside 1px border
  },
  buttonText: {
    paddingLeft: theme.spacing(5),
    textAlign: 'left',
    minWidth: '67%',
    ...theme.typography.body1,
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
    lineHeight: `${theme.typography.body1.fontSize}px`,
    textTransform: 'none',
  },
  avatarImage: {
    borderWidth: '2px',
    borderColor: theme.palette.background.paper,
    borderStyle: 'solid',
  },
}))(CollapsedAvatars)
