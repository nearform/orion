import React from 'react'
import { Avatar, withStyles } from '@material-ui/core'
import classnames from 'classnames'
import T from 'prop-types'

import {
  getEmail,
  getFullName,
  getColorFromEmail,
  getInitials,
  userPropTypes,
} from './utils'

const AvatarImage = ({ theme, classes, user, fullName, className, src }) => {
  const { firstName, lastName, picture } = user
  const email = getEmail(user)
  const color = getColorFromEmail(email)
  const imgSrc = src || picture

  return (
    <Avatar
      className={classnames(classes.root, className)}
      style={{
        boxShadow: theme.shadows[1],
        color: theme.palette.getContrastText(color),
      }}
      src={imgSrc}
    >
      {imgSrc === undefined &&
        getInitials(fullName || getFullName(firstName, lastName, email))}
    </Avatar>
  )
}

AvatarImage.defaultProps = {
  user: {},
}
AvatarImage.propTypes = {
  theme: T.object.isRequired,
  classes: T.object.isRequired,
  user: T.shape(userPropTypes),
  fullName: T.string,
  className: T.string,
  src: T.string,
}
export default withStyles(
  theme => ({
    root: {
      ...theme.typography.h2,
      lineHeight: `${theme.typography.h2.fontSize}px`,
      fontWeight: 'normal',
      marginRight: theme.spacing(1),
    },
  }),
  { withTheme: true }
)(AvatarImage)
