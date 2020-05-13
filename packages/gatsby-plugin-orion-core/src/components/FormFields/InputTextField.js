import React from 'react'
import T from 'prop-types'
import ErrorMessage from './ErrorMessage'
import FieldLabel from './FieldLabel'
import InputHelperText from './InputHelperText'

import { TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  input: {
    '& > .MuiInput-root.Mui-error': {
      borderColor: `${theme.palette.error.main} !important`,
    },
  },
}))

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
  theme,
  inputTypographyVariant,
  ...props
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
        inputProps={{
          onKeyPress,
          style: theme.typography[inputTypographyVariant || 'body'],
        }}
        onChange={onChange}
        {...props}
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
  theme: T.shape({ typography: T.object }),
  inputTypographyVariant: T.string,
}

export default InputTextField
