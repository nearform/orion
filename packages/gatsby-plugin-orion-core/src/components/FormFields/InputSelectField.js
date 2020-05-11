import React, { useState } from 'react'
import T from 'prop-types'
import FieldLabel from './FieldLabel'
import InputHelperText from './InputHelperText'
import ErrorMessage from './ErrorMessage'

import { MenuItem, Select, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  input: {
    '& > .MuiInput-root.Mui-error': {
      borderColor: `${theme.palette.error.main} !important`,
    },
  },
}))

function InputSelectField({
  name,
  required,
  options = [],
  onChange,
  value = '',
  children,
  helperText,
  error = false,
  ...props
}) {
  const classes = useStyles()
  const [selectValue, setValue] = useState(value)
  const handleChange = evt => {
    setValue(evt.target.value)
    if (onChange) {
      onChange(evt)
    }
  }

  return (
    <>
      <FieldLabel required={required} hasError={Boolean(error)}>
        {children}
      </FieldLabel>
      {helperText && (
        <InputHelperText hasError={Boolean(error)}>
          {helperText}
        </InputHelperText>
      )}
      <Select
        name={name}
        value={selectValue}
        className={error ? classes.fieldError : classes.fieldOK}
        onChange={handleChange}
        {...props}
      >
        {options.map(opt => (
          <MenuItem key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </MenuItem>
        ))}
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  )
}

InputSelectField.propTypes = {
  name: T.string.isRequired,
  options: T.array,
  value: T.string,
  helperText: T.string,
  required: T.bool,
  onChange: T.func,
  children: T.node.isRequired,
  error: T.string.isRequired,
}

export default InputSelectField
