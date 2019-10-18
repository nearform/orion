import React from 'react'
import T from 'prop-types'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { withStyles, InputLabel, MenuItem, Typography } from '@material-ui/core'
import { KeyboardArrowUp } from '@material-ui/icons'

function UserSelectPicker({
  classes,
  values,
  handleChange,
  selected: user,
  data,
  label,
  entityKey,
}) {
  const fieldName = `${entityKey}Id`
  const inputId = `select-${entityKey}`
  return (
    <>
      <InputLabel htmlFor={inputId}>
        <Typography variant="h4" className={classes.inputLabel}>
          {label}
        </Typography>
      </InputLabel>
      <Field
        id={inputId}
        fullWidth
        select
        component={TextField}
        name={fieldName}
        value={values[fieldName]}
        onChange={() => {
          handleChange(fieldName)
        }}
        margin="dense"
        SelectProps={{
          classes: {
            root: classes.selectRoot,
            select: classes.selectElem,
            icon: classes.selectIcon,
          },
          IconComponent: KeyboardArrowUp,
        }}
      >
        {!values[fieldName] && (
          <MenuItem disabled value={0}>
            <Typography component="span" color="textSecondary">
              No {label.toLowerCase()} selected
            </Typography>
          </MenuItem>
        )}
        {data[entityKey].map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Field>
    </>
  )
}

const styles = theme => ({
  inputLabel: {
    color: theme.palette.primary.dark,
    fontWeight: 700,
    marginTop: theme.spacing(1),
  },
  selectRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  selectElem: {
    flexGrow: 1,
  },
  selectIcon: {
    color: theme.palette.secondary.main,
  },
})

UserSelectPicker.propTypes = {
  classes: T.object.isRequired,
  user: T.shape({
    id: T.number,
    name: T.string,
  }),
  selected: T.shape({
    id: T.number,
    name: T.string,
  }),
  data: T.object,
  label: T.string,
  entityKey: T.string,
  values: T.object,
  handleChange: T.func,
}

export default withStyles(styles)(UserSelectPicker)
