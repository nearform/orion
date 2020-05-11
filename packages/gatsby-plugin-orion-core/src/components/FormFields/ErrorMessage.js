import React from 'react'
import T from 'prop-types'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  input: {
    '& > .MuiInput-root.Mui-error': {
      borderColor: `${theme.palette.error.main} !important`,
    },
  },
}))

function ErrorMessage({ children }) {
  const classes = useStyles()
  return (
    <Typography
      gutterBottom
      variant="body2"
      color="error"
      className={classes.errorMessage}
    >
      {children}
    </Typography>
  )
}

ErrorMessage.propTypes = {
  children: T.node.isRequired,
}

export default ErrorMessage
