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

// Import SectionTitle from '../page/SectionTitle'
// import { AuthFormStateContext } from './AuthEventMixin'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonProgress: {
    color: theme.palette.primary.dark,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  errorMessage: {
    textTransform: 'none',
    marginTop: '0.5em',
  },
  fieldOK: {
    border: 'none',
  },
  fieldError: {
    border: `1.5pt solid ${theme.palette.error.main}`,
  },
  inputHelperText: {
    'font-size': '14px',
    //   FontFamily: `'Titillium Web', sans-serif`,
    //   color: '#2e2e2e',
    //   fontWeight: 'normal',
    // },
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
      variant="h4"
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
  const classes = useStyles()
  return (
    <Typography
      gutterBottom
      variant="body2"
      color={hasError ? 'error' : 'initial'}
      className={classes.inputHelperText}
    >
      {children}
    </Typography>
  )
}

InputHelperText.propTypes = {
  children: T.node.isRequired,
  hasError: T.bool,
}

function SectionTitleField({ barColor, category, children }) {
  return
  const { errors } = useContext(AuthFormStateContext)
  const error = errors[category]
  return (
    <>
      <SectionTitle gutterBottom barColor={barColor}>
        {children}
      </SectionTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  )
}

SectionTitleField.propTypes = {
  barColor: T.string,
  category: T.string,
  children: T.node.isRequired,
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
  children,
}) {
  const classes = useStyles()
  let submitting
  const errors = {}
  // Console.log(errors, name)
  // Const { submitting, errors } = useContext(AuthFormStateContext)
  const error = errors[name]

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
        disabled={disabled || submitting}
        className={error ? classes.fieldError : classes.fieldOK}
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
}

function InputSelectField({
  name,
  required,
  options = [],
  onChange,
  value = '',
  children,
  helperText,
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

  // Const { submitting, errors } = useContext(AuthFormStateContext)
  let submitting
  const errors = {}
  const error = errors[name]
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
        disabled={submitting}
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
}

function InputField({ type, children, ...props }) {
  if (type === 'select') {
    return <InputSelectField {...props}>{children}</InputSelectField>
  }

  console.log(props)
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

function SubmitButton({ onClick, children }) {
  const classes = useStyles()
  // Const { submitting } = useContext(AuthFormStateContext)
  let submitting
  let errors
  return (
    <div>
      <Button
        fullWidth
        name="submit"
        variant="contained"
        color="primary"
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
  children: T.node.isRequired,
}

export { SectionTitleField, InputField, SubmitButton }
