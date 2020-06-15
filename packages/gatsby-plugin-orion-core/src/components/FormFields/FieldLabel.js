import React from 'react'
import T from 'prop-types'
import { Typography } from '@material-ui/core'

function FieldLabel({ required, hasError, children }) {
  return (
    <Typography
      gutterBottom
      variant="h6"
      color={hasError ? 'error' : 'initial'}
    >
      {children}
      {required && ' *'}
    </Typography>
  )
}

FieldLabel.propTypes = {
  required: T.bool,
  hasError: T.bool,
  children: T.node.isRequired,
}

export default FieldLabel
