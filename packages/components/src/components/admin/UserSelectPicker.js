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
  data,
  label,
  entityKey,
  emptyLabel,
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
        fullWidth
        select
        id={inputId}
        component={TextField}
        name={fieldName}
        value={values[fieldName]}
        margin="dense"
        SelectProps={{
          classes: {
            root: classes.selectRoot,
            select: classes.selectElem,
            icon: classes.selectIcon,
          },
          IconComponent: KeyboardArrowUp,
        }}
        onChange={() => {
          handleChange(fieldName)
        }}
      >
        {(emptyLabel || !values[fieldName]) && (
          <MenuItem disabled={!emptyLabel} value={0}>
            <Typography
              component="span"
              color={emptyLabel ? undefined : 'textSecondary'}
            >
              {emptyLabel || `No ${label.toLowerCase()} selected`}
            </Typography>
          </MenuItem>
        )}
        {data[entityKey].map(option => (
          <MenuItem key={option.id} value={option.id}>
            <Typography component="span">{option.name}</Typography>
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
  emptyLabel: T.string,
}

export default withStyles(styles)(UserSelectPicker)
