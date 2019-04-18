import React from 'react'
import T from 'prop-types'
import { Typography } from '@material-ui/core'

export default function Thumb({ className, value }) {
  return (
    <div className={className}>
      <Typography>{value}</Typography>
    </div>
  )
}

Thumb.propTypes = {
  value: T.number,
  className: T.string,
}
