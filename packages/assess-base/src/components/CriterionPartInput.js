import React, { useState, useCallback } from 'react'
import T from 'prop-types'
import {
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Typography,
  withStyles,
} from '@material-ui/core'
import { Link } from 'gatsby'
import classnames from 'classnames'
import { Field } from 'formik'
import { InputBase, TextField } from 'formik-material-ui'
import {
  Check,
  Clear,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from '@material-ui/icons'
import { uploadFile } from '../utils/storage'

import UploadButton from './UploadButton'
import FileItem from './FileItem'

function CriterionPartInput({
  classes,
  inputKey,
  column,
  values,
  canEdit,
  criteriaList,
  assessmentId,
  setFieldValue,
}) {
  criteriaList = criteriaList.flat()

  const inputId = `${inputKey}-${column.key}`
  const isLink = column.type === 'link'
  const isImage = column.type === 'image'
  const isGap = column.type === 'gap'
  const fieldName = column.key

  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen])

  if (isGap)
    return (
      <Grid item xs={4}>
        {column.name && (
          <Typography variant="h4" className={classes.inputLabel}>
            {column.name}
          </Typography>
        )}
      </Grid>
    )

  const handleFileUpload = async file => {
    const { key } = await uploadFile(file, assessmentId)
    const fieldValue = {
      file_name: file.name,
      file_size: file.size,
      s3_key: key,
    }
    setFieldValue(fieldName, fieldValue)
  }

  // Legacy support for previously-saved assessments where it is a string
  // Data is stored as an array of objects and Hasura can't change each in a migration
  if (isLink && !Array.isArray(values[fieldName])) {
    values[fieldName] = []
  }

  const fieldTypeProps =
    (isLink &&
      getSelectFieldProps(
        classes,
        isOpen,
        toggleOpen,
        criteriaList,
        values[fieldName],
        assessmentId
      )) ||
    (isImage && {
      startAdornment: values[fieldName] ? (
        <FileItem file={values[fieldName]} className={classes.fileItem} />
      ) : (
        <UploadButton
          onFileSelected={handleFileUpload}
          id={`image-upload-${inputKey}-field`}
          className={classes.uploadFieldButton}
          grow={true}
        >
          {
            // Button must have children
            ' '
          }
        </UploadButton>
      ),
      endAdornment: values[fieldName] && (
        <IconButton
          onClick={() => setFieldValue(fieldName, null)}
          className={classes.uploadRemoveButton}
        >
          <Clear />
        </IconButton>
      ),
      type: 'hidden',
    }) ||
    {}

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
            <span
              className={classnames(
                classes.selectItemActive,
                classes.arrowIconOuter,
                classes.middle
              )}
            >
              <ArrowIcon className={classes.arrowIcon} />
            </span>
          )}
          {isImage && canEdit && (
            <UploadButton
              onFileSelected={handleFileUpload}
              id={`image-upload-${inputKey}`}
              className={classes.uploadButton}
              color="secondary"
            >
              Upload
            </UploadButton>
          )}
        </Typography>
      </InputLabel>

      <Field
        id={inputId}
        disabled={!canEdit}
        component={isImage ? InputBase : TextField}
        name={fieldName}
        fullWidth
        {...fieldTypeProps}
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
  arrowIcon: {
    marginTop: theme.spacing(-1),
  },
  arrowIconOuter: {
    height: theme.spacing(1.5),
    display: 'inline-block',
  },
  middle: {
    verticalAlign: 'middle',
  },
  clickable: {
    cursor: 'pointer',
  },
  fileItem: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    overflowX: 'hidden',
  },
  uploadButton: {
    margin: theme.spacing(-1, 1),
    verticalAlign: 'baseline',
    ...theme.typography.h4,
  },
  uploadFieldButton: {
    width: '100%',
    height: theme.spacing(4),
  },
  uploadRemoveButton: {
    padding: theme.spacing(0.5),
  },
})

export default withStyles(styles)(CriterionPartInput)
