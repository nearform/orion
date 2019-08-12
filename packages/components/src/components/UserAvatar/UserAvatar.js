import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core'
import classnames from 'classnames'
import T from 'prop-types'

import AvatarImage from './AvatarImage'
import { getEmail, getFullName, userPropTypes } from './utils'

const UserAvatar = ({ classes, user, className, src }) => {
  const { firstName, lastName, title, picture } = user
  const email = getEmail(user)
  const fullName = getFullName(firstName, lastName, email)

  return (
    <div className={classnames(classes.root, className)}>
      <AvatarImage user={user} fullName={fullName} src={src || picture} />
      <div>
        <div className={classes.fullName}>{fullName}</div>
        {title && <div className={classes.title}>{title}</div>}
      </div>
    </div>
  )
}

const extendedUserPropTypes = {
  title: T.string,
  ...userPropTypes,
}

UserAvatar.defaultProps = {
  user: {},
}
UserAvatar.propTypes = {
  classes: T.object.isRequired,
  user: T.shape(extendedUserPropTypes),
  className: T.string,
  src: T.string,
}
export default withStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
  },
  fullName: {
    ...theme.typography.body1,
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
    lineHeight: `${theme.typography.body1.fontSize}px`,
  },
  title: {
    ...theme.typography.h4,
    color: theme.articleTypography.heading3.color,
    marginTop: theme.spacing(0.5),
  },
}))(UserAvatar)
