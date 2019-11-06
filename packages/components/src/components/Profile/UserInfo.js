import React from 'react'
import T from 'prop-types'
import classnames from 'classnames'
import { withStyles, Typography } from '@material-ui/core'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'

const UserInfo = ({
  title,
  value,
  name,
  size,
  variant,
  editMode,
  rows,
  classes,
}) => (
  <>
    <Typography
      variant="h4"
      className={classnames([
        classes.title,
        { [classes.titleLight]: variant === 'light' },
      ])}
    >
      {title}
    </Typography>
    {!editMode ? (
      <Typography
        variant="body2"
        className={classnames([
          classes.value,
          { [classes.valueLarge]: size === 'large' },
        ])}
      >
        {value}
      </Typography>
    ) : (
      <Field
        name={name}
        render={props => (
          <TextField
            className={classnames([classes.value])}
            inputProps={{ className: classes.input }}
            fullWidth
            rows={rows}
            multiline={!!rows}
            {...props}
          ></TextField>
        )}
      />
    )}
  </>
)

UserInfo.propTypes = {
  title: T.string.isRequired,
  value: T.string,
  name: T.string,
  classes: T.object.isRequired,
  editMode: T.bool,
  size: T.oneOf(['large']),
  variant: T.oneOf(['light']),
  rows: T.number,
}

export default withStyles(theme => ({
  title: {
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(2),
    '&:first-child': {
      marginTop: 0,
    },
  },
  titleLight: {
    ...theme.iconLight,
  },
  value: {
    marginTop: theme.spacing(1) / 2,
  },
  valueLarge: {
    fontWeight: 700,
    fontSize: 21,
    lineHeight: 25 / 21,
    letterSpacing: -0.15,
  },
  input: {
    fontSize: 14,
    lineHeight: 1.2,
    color: theme.palette.primary.dark,
  },
}))(UserInfo)
