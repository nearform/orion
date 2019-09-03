import React, { useState, useCallback } from 'react'
import T from 'prop-types'
import {
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  withStyles,
} from '@material-ui/core'
import { Link } from 'gatsby'
import classnames from 'classnames'
import { Field } from 'formik'

import { TextField } from 'formik-material-ui'
import { Check, KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'

function CriterionPartInput({
  classes,
  inputKey,
  column,
  values,
  canEdit,
  criteriaList,
  assessmentId,
}) {
  criteriaList = criteriaList.flat()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen])

  const inputId = `${inputKey}-${column.key}`
  const isLink = column.type === 'link'
  const fieldName = column.key

  // Legacy support for previously-saved assessments where it is a string
  // Data is stored as an array of objects and Hasura can't change each in a migration
  if (isLink && !Array.isArray(values[fieldName])) {
    values[fieldName] = []
  }

  const selectFieldProps = isLink
    ? getSelectFieldProps(
        classes,
        isOpen,
        toggleOpen,
        criteriaList,
        values[fieldName],
        assessmentId
      )
    : {}

  const ArrowIcon = isOpen ? KeyboardArrowUp : KeyboardArrowDown

  return (
    <Grid item xs={4}>
      <InputLabel htmlFor={inputId}>
        <Typography
          variant="h4"
          gutterBottom
          onClick={isLink && canEdit ? toggleOpen : null}
          className={classnames(classes.inputLabel, {
            [classes.clickable]: isLink,
          })}
        >
          {column.name}
          {isLink && canEdit && (
            <span className={classes.selectItemActive}>
              <ArrowIcon className={classes.middle} />
            </span>
          )}
        </Typography>
      </InputLabel>

      <Field
        id={inputId}
        disabled={!canEdit}
        component={TextField}
        name={fieldName}
        fullWidth
        {...selectFieldProps}
      />
    </Grid>
  )
}

function getSelectFieldProps(
  classes,
  isOpen,
  toggleOpen,
  criteriaList,
  value,
  assessmentId
) {
  const renderValue = selected =>
    selected.map(selectedKey => {
      const selectedCriterion = criteriaList.find(
        item => item.key === selectedKey
      )
      return (
        <Typography
          variant="h3"
          className={classes.selectedItemInput}
          key={selectedKey}
        >
          <Link
            to={`/${selectedCriterion.path}#${assessmentId}`}
            className={classes.selectItemActive}
          >
            {selectedCriterion.name}
          </Link>
        </Typography>
      )
    })

  const children = criteriaList.map(option => {
    const isChecked = value.includes(option.key)
    return (
      <MenuItem
        key={option.key}
        value={option.key}
        className={classnames(classes.selectItem, {
          [classes.selectItemActive]: isChecked,
        })}
      >
        <Typography variant="h3">
          <span className={classes.iconSpacer}>
            {isChecked && <Check className={classes.middle} />}
          </span>
          {option.name}
        </Typography>
      </MenuItem>
    )
  })

  return {
    select: true,
    options: criteriaList,
    SelectProps: {
      IconComponent: 'span',
      MenuProps: {
        classes: {
          paper: classes.selectMenu,
        },
      },
      open: isOpen,
      onOpen: toggleOpen,
      onClose: toggleOpen,
      multiple: true,
      renderValue,
    },
    children,
  }
}

CriterionPartInput.propTypes = {
  classes: T.object.isRequired,
  column: T.object.isRequired,
  inputKey: T.string.isRequired,
  values: T.object.isRequired,
  canEdit: T.bool,
  criteriaList: T.array,
}

const styles = theme => ({
  inputLabel: {
    color: theme.palette.primary.dark,
    fontWeight: 700,
  },
  selectItem: {
    color: theme.palette.text.secondary,
    minHeight: theme.spacing(5),
    '&$selectItemActive': {
      background: 'inherit',
    },
  },
  selectItemActive: {
    color: theme.palette.secondary.main,
  },
  selectedItemInput: {
    lineHeight: 2,
  },
  selectMenu: {
    marginTop: theme.spacing(3),
  },
  iconSpacer: {
    width: theme.spacing(5),
    display: 'inline-block',
  },
  middle: {
    verticalAlign: 'middle',
  },
  clickable: {
    cursor: 'pointer',
  },
})

export default withStyles(styles)(CriterionPartInput)
