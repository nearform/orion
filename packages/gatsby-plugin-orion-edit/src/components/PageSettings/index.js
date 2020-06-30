import React, { useCallback, useState } from 'react'
import {
  Button,
  Drawer,
  IconButton,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Input,
  makeStyles,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import classnames from 'classnames'

import { useEditComponents } from '../EditComponentProvider'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0, 2.5),
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiFormLabel-root': {
      ...theme.typography.h6,
      fontSize: '14px',
    },
    '& .MuiInputBase-root': {
      height: theme.spacing(4),
    },
  },
  paper: {
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.only('md')]: {
      width: '40%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30%',
    },
  },
  header: {
    borderBottom: 'solid 1px #979797',
  },
  settingsIcon: {
    color: theme.palette.tertiary.main,
  },
  closeIcon: {
    color: theme.palette.tertiary.dark,
  },
  settingHeader: {
    color: theme.palette.tertiary.dark,
    margin: theme.spacing(0, 0, 0.5, 1),
  },
  updateButton: {
    minWidth: theme.spacing(20),
    margin: theme.spacing(2, 0),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  layoutOption: {
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1, 0),
    '& .MuiTypography-root': {
      ...theme.typography.h5,
    },
  },
  selectedLayoutOption: {
    backgroundColor: theme.palette.secondary.main,
    '& .MuiTouchRipple-root': { display: 'none' },
    '& .MuiIconButton-label > .MuiIconButton-root': {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.action.main,
      padding: 3,
      '& .MuiIconButton-label': {
        width: 18,
        height: 18,
      },
    },
    '& .MuiTypography-root': {
      ...theme.typography.h5,
      color: theme.palette.background.default,
    },
  },
  unselectedLayoutOption: {
    border: `solid 1px rgba(178, 178, 178, 0.51)`,
    boxShadow: 'inset 0 2px 0 0 rgba(255, 255, 255, 0.1)',
    '& .MuiSvgIcon-root': {
      color: 'rgba(178, 178, 178, 0.51)',
    },
    '& .MuiTypography-root': {
      ...theme.typography.h5,
      color: theme.palette.action.main,
    },
  },
  showMenuRadios: {
    margin: theme.spacing(0, 2),
    '& .MuiIconButton-label': {
      color: theme.palette.tertiary.main,
    },
  },
}))

function PageSettings({ open, onCancel, onSave, page }) {
  const classes = useStyles()
  const { layouts } = useEditComponents()

  const [dirty, setDirty] = useState(false)
  const [layout, setLayout] = useState(page.layout || '')
  const [path, setPath] = useState(page.path)
  const [publishedDate, setPublishedDate] = useState(page.published || null)
  const [showInMenu, setShowInMenu] = useState(page.show_in_menu)
  const [title, setTitle] = useState(page.title)

  const handleCancel = useCallback(() => {
    setLayout(page.layout)
    setPath(page.path)
    setPublishedDate(page.published || null)
    setShowInMenu(page.show_in_menu)
    setTitle(page.title)

    onCancel()
  }, [
    page,
    onCancel,
    setLayout,
    setPublishedDate,
    setPath,
    setShowInMenu,
    setTitle,
  ])

  const handleSave = useCallback(() => {
    onSave({
      ...page,
      layout,
      path,
      published: publishedDate,
      show_in_menu: showInMenu, // eslint-disable-line camelcase
      title,
    })

    setDirty(false)
  }, [layout, onSave, page, path, showInMenu, title, publishedDate])

  return (
    <Drawer
      anchor="right"
      open={open}
      classes={{ paper: classes.paper }}
      onClose={handleCancel}
    >
      <div className={classes.root}>
        <Grid container justify="space-between" className={classes.header}>
          <Grid container item alignItems="center" xs={6}>
            <Grid item>
              <IconButton size="small">
                <CloseIcon className={classes.closeIcon} fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h5" className={classes.settingHeader}>
                Page settings
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={!dirty}
              className={classes.updateButton}
              onClick={handleSave}
            >
              {dirty ? 'Save updates' : 'Saved'}
            </Button>
          </Grid>
        </Grid>
        <FormControl fullWidth className={classes.input}>
          <FormLabel component="legend">Title</FormLabel>
          <Input
            value={title}
            onChange={event => {
              setTitle(event.target.value)
              setDirty(true)
            }}
          />
        </FormControl>
        <FormControl fullWidth className={classes.input}>
          <FormLabel component="legend">Path</FormLabel>
          <Input
            value={path}
            onChange={event => {
              setPath(event.target.value)
              setDirty(true)
            }}
          />
        </FormControl>
        <FormControl fullWidth className={classes.input}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <FormLabel component="legend">Show in menu</FormLabel>
            </Grid>
            <Grid item>
              <RadioGroup
                row
                value={showInMenu}
                onChange={event => {
                  setShowInMenu(event.target.value === 'true')
                  setDirty(true)
                }}
              >
                <FormControlLabel
                  value
                  control={<Radio />}
                  label="Yes"
                  labelPlacement="start"
                  className={classes.showMenuRadios}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                  labelPlacement="start"
                  className={classes.showMenuRadios}
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </FormControl>
        <FormControl fullWidth className={classes.input}>
          <FormLabel component="legend">Layout</FormLabel>
          <RadioGroup
            value={layout}
            onChange={event => {
              setLayout(event.target.value)
              setDirty(true)
            }}
          >
            {Object.entries(layouts).map(([key, { name }]) => (
              <FormControlLabel
                key={key}
                value={key}
                control={
                  <Radio
                    checkedIcon={
                      <IconButton
                        disabled
                        disableRipple
                        className={classes.checkedIcon}
                      >
                        <CheckIcon />
                      </IconButton>
                    }
                  />
                }
                label={name}
                labelPlacement="end"
                className={classnames(classes.layoutOption, {
                  [classes.selectedLayoutOption]: layout === key,
                  [classes.unselectedLayoutOption]: layout !== key,
                })}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </Drawer>
  )
}

export default PageSettings
