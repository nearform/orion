import React from 'react'
import T from 'prop-types'
import { withTheme } from '@material-ui/core'

import InputTextField from './InputTextField'
import InputSelectField from './InputSelectField'

import UploadImage from '../UploadImage'

const InputField = withTheme(({ type, children, ...props }) => {
  if (type === 'select') {
    return <InputSelectField {...props}>{children}</InputSelectField>
  }

  if (type === 'image') return <UploadImage {...props} />

  return (
    <InputTextField type={type} {...props}>
      {children}
    </InputTextField>
  )
})

InputField.propTypes = {
  type: T.string,
  children: T.node.isRequired,
}

export { InputField }
