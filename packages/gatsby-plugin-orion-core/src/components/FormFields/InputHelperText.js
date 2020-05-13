import React from 'react'
import T from 'prop-types'
import { Typography } from '@material-ui/core'

function InputHelperText({ children, hasError }) {
  return (
    <Typography
      gutterBottom
      variant="body2"
      color={hasError ? 'error' : 'initial'}
    >
      {children}
    </Typography>
  )
}

InputHelperText.propTypes = {
  children: T.node.isRequired,
  hasError: T.bool,
}

export default InputHelperText
