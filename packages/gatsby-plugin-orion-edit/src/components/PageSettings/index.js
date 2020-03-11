import React, { useCallback, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from '@material-ui/core'
import { useEditComponents } from '../EditComponentProvider'

const useStyles = makeStyles(theme => ({
  input: {
    marginBottom: theme.spacing(1),
  },
}))

function PageSettings({ open, onCancel, onSave, page }) {
  const classes = useStyles()
  const { layouts } = useEditComponents()

  const [layout, setLayout] = useState(page.layout)
  const [path, setPath] = useState(page.path)
  const [published, setPublished] = useState(page.published !== null)
  const [showInMenu, setShowInMenu] = useState(page.show_in_menu)
  const [title, setTitle] = useState(page.title)

  const handleCancel = useCallback(() => {
    setLayout(page.layout)
    setPath(page.path)
    setPublished(page.published !== null)
    setShowInMenu(page.show_in_menu)
    setTitle(page.title)

    onCancel()
  }, [page, onCancel, setLayout, setPath, setPublished, setShowInMenu, setTitle])

  const handleSave = useCallback(() => {
    onSave({
      ...page,
      layout,
      path,
      published: published ? page.published || new Date() : null,
      show_in_menu: showInMenu, // eslint-disable-line camelcase
      title,
    })
  }, [layout, onSave, page, path, published, showInMenu, title])

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>
        Page settings
      </DialogTitle>
      <DialogContent>
      <FormControl fullWidth className={classes.input}>
          <InputLabel shrink>Title</InputLabel>
          <Input value={title} onChange={event => setTitle(event.target.value)} />
        </FormControl>
        <FormControl fullWidth className={classes.input}>
          <InputLabel shrink>Path</InputLabel>
          <Input value={path} onChange={event => setPath(event.target.value)} />
        </FormControl>
        <FormControl fullWidth className={classes.input}>
          <InputLabel shrink>Show in menu</InputLabel>
          <Select value={showInMenu} onChange={event => setShowInMenu(event.target.value)}>
            <MenuItem value>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className={classes.input}>
          <InputLabel shrink>Published</InputLabel>
          <Select value={published} onChange={event => setPublished(event.target.value)}>
            <MenuItem value>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className={classes.input}>
          <InputLabel shrink>Layout</InputLabel>
          <Select value={layout} onChange={event => setLayout(event.target.value)}>
            {Object.entries(layouts).map(([key, { name }]) => (
              <MenuItem key={key} value={key}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
  )
}

export default PageSettings
