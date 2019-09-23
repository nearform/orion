import React, { useContext, useState } from 'react'
import T from 'prop-types'
import { Typography, TextField, Select, MenuItem } from '@material-ui/core'
import { SectionTitle } from 'components'

import { ErrorContext } from './AuthEventMixin'

function FieldLabel({ required, hasError, children }) {
  return (
    <Typography
      variant="h4"
      gutterBottom
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
}

function ErrorMessage({ children }) {
  return (
    <Typography
      variant="h4"
      gutterBottom
      color="error"
      style={{ textTransform: 'none', marginTop: '0.5em' }}
    >
      {children}
    </Typography>
  )
}

function SectionTitleField({ barColor, category, children }) {
  const error = useContext(ErrorContext)
  const showError = error && error.category === category
  return (
    <React.Fragment>
      <SectionTitle gutterBottom barColor={barColor}>
        {children}
      </SectionTitle>
      {showError && <ErrorMessage>{error.message}</ErrorMessage>}
    </React.Fragment>
  )
}

SectionTitleField.propTypes = {
  barColor: T.string,
  category: T.string,
}

function InputTextField({ name, type, required, onChange, children }) {
  const error = useContext(ErrorContext)
  const showError = error && error.category === name
  return (
    <React.Fragment>
      <FieldLabel required={required} hasError={showError}>
        {children}
      </FieldLabel>
      <TextField
        name={name}
        type={type}
        required={required}
        onChange={onChange}
        fullWidth
        style={{ border: showError ? '1.5pt solid red' : 'none' }}
      />
      {showError && <ErrorMessage>{error.message}</ErrorMessage>}
    </React.Fragment>
  )
}

InputTextField.propTypes = {
  name: T.string.isRequired,
  type: T.string,
  required: T.bool,
  onChange: T.func,
}

function InputSelectField({
  name,
  required,
  options = [],
  onChange,
  value = '',
  children,
  ...props
}) {
  const [selectValue, setValue] = useState(value)
  const handleChange = evt => {
    setValue(evt.target.value)
    if (onChange) {
      onChange(evt)
    }
  }
  const error = useContext(ErrorContext)
  const showError = error && error.category === name
  return (
    <React.Fragment>
      <FieldLabel required={required} hasError={showError}>
        {children}
      </FieldLabel>
      <Select {...props} onChange={handleChange} value={selectValue}>
        {options.map(opt => (
          <MenuItem key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  )
}

InputSelectField.propTypes = {
  name: T.string.isRequired,
  options: T.array,
  value: T.string,
  required: T.bool,
  onChange: T.func,
}

function InputField({ type, children, ...props }) {
  if (type === 'select') {
    return <InputSelectField {...props}>{children}</InputSelectField>
  }
  return <InputTextField {...props}>{children}</InputTextField>
}

InputField.propTypes = {
  type: T.string,
}

export { SectionTitleField, InputField }
