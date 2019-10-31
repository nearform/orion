import React from 'react'
import T from 'prop-types'
import { Typography } from '@material-ui/core'

export default function Thumb({ className, value, thumbIconClass, ...props }) {
  return (
    <div className={`${className} ${thumbIconClass}`} {...props}>
      <Typography variant="h6" color="inherit">
        {value}
      </Typography>
    </div>
  )
}

Thumb.propTypes = {
  value: T.number,
  thumbIconClass: T.string,
  className: T.string,
}
