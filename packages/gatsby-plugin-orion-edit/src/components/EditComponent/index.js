/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import classNames from 'classnames'
import { useEditComponents } from '../EditComponentProvider'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    minHeight: 150,
    minWidth: 150,
    position: 'relative',
    width: '100%',
    marginTop: '36px',

    '&:hover:after, &$empty:after': {
      backgroundColor: theme.palette.grey['300'],
      content: '""',
      opacity: 0.1,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  },
  input: {
    marginBottom: theme.spacing(1),
    position: 'absolute',
    right: '1px',
    top: '-41px',
  },
}))

function EditComponent({
  component,
  isEditing,
  onSave,
  page,
  props = {},
}) {
  const classes = useStyles()
  const { components } = useEditComponents()

  const [currentComponent, setCurrentComponent] = useState(component)
  const [currentPage, setCurrentPage] = useState(page)
  const [currentProps, setCurrentProps] = useState(props)

  const handleComponentChange = useCallback(
    event => {
      setCurrentComponent(event.target.value)
      setCurrentProps({})
      onSave(event.target.value, currentProps, currentPage)
    },
    [setCurrentComponent, setCurrentProps, onSave, currentProps, currentPage]
  )

  const handleEditorChange = useCallback(
    (props, page) => {
      setCurrentPage(page)
      setCurrentProps(props)
      onSave(currentComponent, props, page)
    },
    [currentComponent, onSave, setCurrentPage, setCurrentProps]
  )

  const config = components[component]

  const PreviewComponent = config ? config.preview : undefined
  const PreviewEditor = config ? config.editor : undefined

  return (
    <>
      {isEditing && (
        <div
          className={classNames(classes.root, {
            [classes.empty]: PreviewEditor === undefined,
          })}
        >
          { page.layout !== 'article' && (
          <FormControl className={classes.input}>
            <InputLabel htmlFor="component-select">
              Select Component
            </InputLabel>
            <Select
              inputProps={{
                id: 'component-select',
              }}
              value={currentComponent}
              onChange={handleComponentChange}
            >
              { Object.keys(components).map(component => (
                <MenuItem key={component} value={component}>
                  {component}
                </MenuItem>
              )) }
            </Select>
          </FormControl>
          )
          }
          { PreviewEditor !== undefined && (
            <PreviewEditor
              {...props}
              page={page}
              onChange={handleEditorChange}
            />
          )}
        </div>
      )}
      { !isEditing && PreviewComponent !== undefined && (
        <PreviewComponent {...props} page={page} />
      ) }
    </>
  )
}

EditComponent.propTypes = {
  component: PropTypes.string,
  isEditing: PropTypes.bool,
  layout: PropTypes.string,
  onSave: PropTypes.func,
  page: PropTypes.object,
  props: PropTypes.object,
}

export default EditComponent
