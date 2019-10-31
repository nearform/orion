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
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import classnames from 'classnames'
import { Field } from 'formik'
import { InputBase, TextField } from 'formik-material-ui'
import {
  Check,
  Clear,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Launch,
} from '@material-ui/icons'
import { uploadFile } from '../utils/storage'

import ContentModal from './ContentModal'
import UploadButton from './UploadButton'
import FileItem from './FileItem'

function CriterionPartInputField({
  classes,
  fieldName,
  inputId,
  canEdit,
  component,
  fieldTypeProps,
}) {
  return (
    <Field
      id={inputId}
      disabled={!canEdit}
      component={component}
      name={fieldName}
      className={classes.field}
      fullWidth
      {...fieldTypeProps}
    />
  )
}

function CriterionPartInput({
  classes,
  inputKey,
  column,
  values,
  canEdit,
  criteriaList,
  assessmentId,
  setFieldValue,
  isDisabledAndEmpty,
}) {
  criteriaList = criteriaList.flat()

  const { t } = useTranslation()
  const inputId = `${inputKey}-${column.key}`
  const fieldName = column.key

  const isText = !column.type || column.type === 'text'
  const isLink = column.type === 'link'
  const isImage = column.type === 'image'
  const isGap = column.type === 'gap'

  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen])

  if (isGap)
    return (
      <Grid item xs={4} key={inputKey}>
        {column.name && (
          <Typography
            variant="h4"
            className={classnames(classes.inputLabel, {
              [classes.disabledAndEmpty]: isDisabledAndEmpty,
            })}
          >
            {t(column.name)}
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

  const fieldTypeProps = (isLink &&
    getSelectFieldProps(
      classes,
      isOpen,
      toggleOpen,
      criteriaList,
      values[fieldName],
      assessmentId,
      inputKey
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
    }) || {
      multiline: true,
      rowsMax: 6,
      InputProps: {
        classes: {
          multiline: classes.multiline,
          inputMultiline: classes.inputMultiline,
        },
      },
    }

  const ArrowIcon = isOpen ? KeyboardArrowUp : KeyboardArrowDown

  return (
    <Grid item xs={4} key={inputKey}>
      <InputLabel htmlFor={inputId}>
        <Typography
          variant="h4"
          gutterBottom
          onClick={(isLink && canEdit) || isText ? toggleOpen : null}
          className={classnames(classes.inputLabel, {
            [classes.clickable]: isLink || isText,
            [classes.disabledAndEmpty]: isDisabledAndEmpty,
          })}
        >
          {t(column.name)}
          {isText && (
            <Launch
              className={classnames(
                classes.active,
                classes.middle,
                classes.modalIcon
              )}
            />
          )}
          {isLink && canEdit && (
            <span
              className={classnames(
                classes.active,
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
              {t('Upload')}
            </UploadButton>
          )}
        </Typography>
      </InputLabel>

      <CriterionPartInputField
        classes={classes}
        fieldName={fieldName}
        canEdit={canEdit}
        inputId={inputId}
        component={isImage ? InputBase : TextField}
        fieldTypeProps={fieldTypeProps}
      />

      {isText && isOpen && (
        <ContentModal title={column.name} onClose={toggleOpen}>
          <CriterionPartInputField
            classes={classes}
            fieldName={fieldName}
            canEdit={canEdit}
            inputId={inputId}
            component={isImage ? InputBase : TextField}
            fieldTypeProps={Object.assign({}, fieldTypeProps, {
              rowsMax: null,
            })}
          />
        </ContentModal>
      )}
    </Grid>
  )
}

function getSelectFieldProps(
  classes,
  isOpen,
  toggleOpen,
  criteriaList,
  value,
  assessmentId,
  inputKey
) {
  const { t } = useTranslation()
  const renderValue = selected =>
    selected.map(selectedKey => {
      const selectedCriterion = criteriaList.find(
        item => item.key === selectedKey
      )
      return (
        selectedCriterion && (
          <Typography
            variant="h3"
            className={classes.selectedItemInput}
            key={selectedKey}
          >
            <Link
              to={`/${selectedCriterion.path}#${assessmentId}`}
              className={classes.active}
            >
              {selectedCriterion.name}
            </Link>
          </Typography>
        )
      )
    })

  const children = criteriaList.map(option => {
    const isChecked = value.includes(option.key)
    return (
      <MenuItem
        key={`${inputKey}-${option.key}`}
        value={option.key}
        className={classnames(classes.selectItem, {
          [classes.active]: isChecked,
        })}
      >
        <Typography variant="h3">
          <span className={classes.iconSpacer}>
            {isChecked && <Check className={classes.middle} />}
          </span>
          {t(option.name)}
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
      classes: {
        select: classes.selectField,
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
  selectField: {
    minHeight: theme.spacing(2.5),
  },
  inputLabel: {
    color: theme.palette.primary.dark,
    fontWeight: 700,
  },
  selectItem: {
    color: theme.palette.text.secondary,
    minHeight: theme.spacing(5),
    '&$active': {
      background: 'inherit',
    },
  },
  active: {
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
  modalIcon: {
    height: theme.spacing(2),
    display: 'inline-block',
  },
  middle: {
    verticalAlign: 'middle',
  },
  multiline: {
    padding: 0,
    alignItems: 'flex-start',
  },
  inputMultiline: {
    ...theme.typography.body2,
    width: '100%',
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
  disabledAndEmpty: {
    color: theme.palette.background.dark,
  },
})

export default withStyles(styles)(CriterionPartInput)
