import React, { useContext, useState } from 'react'
import T from 'prop-types'
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import { SectionTitle } from 'components'

import { AuthStateContext } from './AuthEventMixin'

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
  const { errors } = useContext(AuthStateContext)
  const error = errors[category]
  return (
    <React.Fragment>
      <SectionTitle gutterBottom barColor={barColor}>
        {children}
      </SectionTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </React.Fragment>
  )
}

SectionTitleField.propTypes = {
  barColor: T.string,
  category: T.string,
}

function InputTextField({
  name,
  type,
  required,
  disabled,
  onChange,
  children,
}) {
  const { submitting, errors } = useContext(AuthStateContext)
  const error = errors[name]
  return (
    <React.Fragment>
      <FieldLabel required={required} hasError={!!error}>
        {children}
      </FieldLabel>
      <TextField
        name={name}
        type={type}
        required={required}
        disabled={disabled || submitting}
        onChange={onChange}
        fullWidth
        style={{ border: error ? '1.5pt solid red' : 'none' }}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
  const { submitting, errors } = useContext(AuthStateContext)
  const error = errors[name]
  return (
    <React.Fragment>
      <FieldLabel required={required} hasError={!!error}>
        {children}
      </FieldLabel>
      <Select
        name={name}
        disabled={submitting}
        onChange={handleChange}
        value={selectValue}
        style={{ border: error ? '1.5pt solid red' : 'none' }}
        {...props}
      >
        {options.map(opt => (
          <MenuItem key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </MenuItem>
        ))}
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
  return (
    <InputTextField type={type} {...props}>
      {children}
    </InputTextField>
  )
}

InputField.propTypes = {
  type: T.string,
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: teal[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

function SubmitButton({ onClick, children }) {
  const classes = useStyles()
  const { submitting } = useContext(AuthStateContext)
  return (
    <div className={classes.wrapper}>
      <Button
        name="submit"
        color="secondary"
        variant="contained"
        fullWidth
        onClick={onClick}
      >
        {children}
      </Button>
      {submitting && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  )
}

SubmitButton.propTypes = {
  onClick: T.func.isRequired,
}

export { SectionTitleField, InputField, SubmitButton }
