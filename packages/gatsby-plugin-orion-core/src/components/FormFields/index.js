import React, { useState } from 'react'
import T from 'prop-types'
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  input: {
    '& > .MuiInput-root.Mui-error': {
      borderColor: `${theme.palette.error.main} !important`,
    },
  },
}))

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

function InputTextField({
  name,
  type,
  value,
  helperText,
  required,
  disabled,
  onChange,
  onEnterKey,
  error = false,
  children,
}) {
  const classes = useStyles()

  const onKeyPress = e => {
    if (e.key === 'Enter' && onEnterKey) {
      onEnterKey(e)
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
      <TextField
        fullWidth
        name={name}
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        className={classes.input}
        error={Boolean(error)}
        inputProps={{ onKeyPress }}
        onChange={onChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  )
}

InputTextField.propTypes = {
  name: T.string.isRequired,
  type: T.string,
  value: T.string,
  helperText: T.string,
  required: T.bool,
  disabled: T.bool,
  onChange: T.func,
  onEnterKey: T.func,
  children: T.node.isRequired,
  error: T.string,
}

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

function InputField({ type, children, ...props }) {
  if (type === 'select') {
    return <InputSelectField {...props}>{children}</InputSelectField>
  }

  return (
    <InputTextField type={type} {...props}>
      {children}
    </InputTextField>
  )
}

InputField.propTypes = {
  type: T.string,
  children: T.node.isRequired,
}

function SubmitButton({ onClick, children, hasError }) {
  return (
    <Button
      fullWidth
      name="submit"
      variant="contained"
      color="primary"
      disabled={hasError}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

SubmitButton.propTypes = {
  onClick: T.func.isRequired,
  children: T.node.isRequired,
  hasError: T.bool,
}

export { InputField, SubmitButton }
