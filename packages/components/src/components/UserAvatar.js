import React from 'react'
import { Avatar, withStyles, makeStyles } from '@material-ui/core'
import classnames from 'classnames'
import T from 'prop-types'
import * as colors from '@material-ui/core/colors'
const validColors = Object.keys(colors)
  .filter(c => !!colors[c][500])
  .map(c => colors[c][500])

function djb2(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i) /* hash * 33 + c */
  }
  return hash
}

function getColorFromEmail(email) {
  return validColors[
    ((djb2(email) % validColors.length) + validColors.length) %
      validColors.length
  ]
}

function getInitials(name = '') {
  return name.split(' ').reduce((result, part, i) => {
    if (i < 2) {
      result += part.charAt(0).toUpperCase()
    }
    return result
  }, '')
}

function _placeholderEtoN(email) {
  return email
    .split('@')[0]
    .split('.')
    .map(n => n.charAt(0).toUpperCase() + n.slice(1))
    .join(' ')
}

const UserAvatar = ({
  theme,
  classes,
  email,
  memberType,
  fullName,
  picture,
  className,
}) => {
  const name = fullName ? fullName : _placeholderEtoN(email)
  const color = getColorFromEmail(email)
  return (
    <div className={classnames(classes.root, className)}>
      <Avatar
        className={classes.avatar}
        style={{
          backgroundColor: color,
          color: theme.palette.getContrastText(color),
        }}
        src={picture}
      >
        {getInitials(name)}
      </Avatar>
      <div>
        <div className={classes.fullName}>{name}</div>
        {memberType && <div className={classes.memberType}>{memberType}</div>}
      </div>
    </div>
  )
}

UserAvatar.propTypes = {
  theme: T.any,
  classes: T.any,
  email: T.string.isRequired,
  memberType: T.string,
  fullName: T.string,
  picture: T.string,
  className: T.string,
}
export default withStyles(
  theme => ({
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
    avatar: {
      ...theme.typography.h2,
      lineHeight: `${theme.typography.h2.fontSize}px`,
      fontWeight: 'normal',
      marginRight: theme.spacing(1),
      //fontSize: theme.typography.h6.fontSize,
    },
    memberType: {
      ...theme.typography.h4,
      color: theme.articleTypography.heading3.color,
      marginTop: theme.spacing(0.5),
    },
  }),
  { withTheme: true }
)(UserAvatar)
