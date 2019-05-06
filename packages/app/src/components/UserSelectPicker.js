import React from 'react'
import T from 'prop-types'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { MenuItem } from '@material-ui/core'

function UserSelectPicker({
  values,
  handleChange,
  selected: user,
  data,
  label,
  entityKey,
}) {
  const fieldName = `${entityKey}Id`
  return (
    <Field
      fullWidth
      select
      component={TextField}
      name={fieldName}
      label={label}
      value={values[fieldName]}
      onChange={() => {
        handleChange(fieldName)
      }}
      margin="dense"
      variant="outlined"
    >
      {!values[fieldName] && (
        <MenuItem disabled value={null}>
          No {label.toLowerCase()} selected
        </MenuItem>
      )}
      {data[entityKey].map(option => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </Field>
  )
}

UserSelectPicker.propTypes = {
  user: T.shape({
    id: T.number,
    name: T.string,
  }),
  data: T.object,
  label: T.string,
  entityKey: T.string,
  values: T.object,
  handleChange: T.func,
}

export default UserSelectPicker
