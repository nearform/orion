import React, { useCallback, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import EditIcon from '@material-ui/icons/Edit'
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

    '&:hover': {
      '& $button': {
        display: 'flex',
      },
    },
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
  button: {
    display: 'none',
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    zIndex: 1,
  },
  empty: {
    '& $button': {
      display: 'flex',
    },
  },
  input: {
    marginBottom: theme.spacing(1),
    position: 'absolute',
    right: '1px',
    top: '-41px',
  },
}))

// TODO Add prop types
function EditComponent({
  layout,
  component,
  isEditing,
  onSave,
  page,
  props = {},
  handleSaveTags,
}) {
  const classes = useStyles()
  const { components } = useEditComponents()

  const [showSettings, setShowSettings] = useState(false)
  const [currentComponent, setCurrentComponent] = useState(component)
  const [currentPage, setCurrentPage] = useState(page)
  const [currentProps, setCurrentProps] = useState(props)

  const handleCancel = useCallback(() => {
    setCurrentComponent(component)
    setCurrentPage(page)
    setCurrentProps(props)
    setShowSettings(false)
  }, [
    component,
    page,
    props,
    setCurrentComponent,
    setCurrentPage,
    setCurrentProps,
  ])

  const handleComponentChange = useCallback(
    event => {
      setCurrentComponent(event.target.value)
      setCurrentProps({})
      onSave(event.target.value, currentProps, currentPage)
    },
    [setCurrentComponent, setCurrentProps, onSave, currentProps, currentPage]
  )

  const handleSettingsChange = useCallback(
    (props, page) => {
      setCurrentPage(page)
      setCurrentProps(props)
    },
    [setCurrentPage, setCurrentProps]
  )

  const handleSave = useCallback(() => {
    setShowSettings(false)
    onSave(currentComponent, currentProps, currentPage)
  }, [currentComponent, currentPage, currentProps, onSave])

  const handleEditorChange = useCallback(
    (props, page) => {
      setCurrentPage(page)
      setCurrentProps(props)
      onSave(currentComponent, props, page)
    },
    [currentComponent, onSave, setCurrentPage, setCurrentProps]
  )

  const config = components[component]
  const currentConfig = components[currentComponent]

  const PreviewComponent = config ? config.preview : undefined
  const PreviewEditor = config ? config.editor : undefined
  const SettingsEditor = currentConfig ? currentConfig.settings : undefined

  return (
    <>
      {isEditing && (
        <div
          className={classNames(classes.root, {
            [classes.empty]: PreviewEditor === undefined,
          })}
        >
          <Fab
            className={classes.button}
            color="primary"
            size="small"
            onClick={() => setShowSettings(true)}
          >
            <EditIcon />
          </Fab>
          {layout !== 'article' && (
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
                {Object.keys(components).map(component => (
                  <MenuItem key={component} value={component}>
                    {component}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {PreviewEditor !== undefined && (
            <PreviewEditor
              {...props}
              page={page}
              onChange={handleEditorChange}
            />
          )}
          <Dialog fullWidth open={showSettings} onClose={handleCancel}>
            <DialogTitle>Component settings</DialogTitle>

            <DialogContent>
              {SettingsEditor !== undefined && (
                <SettingsEditor
                  page={page}
                  props={currentProps}
                  handleSaveTags={handleSaveTags}
                  onChange={handleSettingsChange}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Apply
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {!isEditing && PreviewComponent !== undefined && (
        <PreviewComponent {...props} page={page} />
      )}
    </>
  )
}

export default EditComponent
