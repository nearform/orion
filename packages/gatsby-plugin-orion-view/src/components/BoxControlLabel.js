import React from 'react'
import { FormControlLabel, withStyles } from '@material-ui/core'

const BoxControlLabel = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.light,
    borderRadius: 3,
  },
  label: {
    ...theme.typography.button,
    color: theme.palette.primary.dark,
    paddingRight: theme.spacing(2),
    userSelect: 'none',
  },
}))(React.forwardRef((props, ref) => <FormControlLabel ref={ref} {...props} />))

export default BoxControlLabel
