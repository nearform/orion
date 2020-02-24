import React from 'react'
import T from 'prop-types'
import { Button } from '@material-ui/core'

function MyForm({ children, ...props }) {
  return (
    <Button component="label" {...props}>
      {children}
      <input type="file" accept="image/*" style={{ display: 'none' }} />
    </Button>
  )
}

MyForm.propTypes = {
  children: T.oneOfType([T.string, T.element]),
}

export default MyForm
