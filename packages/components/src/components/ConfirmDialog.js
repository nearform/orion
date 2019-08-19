import React, { useState } from 'react'
import T from 'prop-types'
import {
  withStyles,
  Button,
  ButtonBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@material-ui/core'
import classnames from 'classnames'

function ConfirmDialog({
  classes,
  children,
  onConfirm,
  title,
  type,
  okayLabel,
  cancelLabel,
  text,
  disabled,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen() {
    if (!disabled) setIsOpen(true)
  }
  function handleClose() {
    setIsOpen(false)
  }
  function handleConfirm() {
    onConfirm()
    handleClose()
  }

  return (
    <>
      <Dialog
        className={className}
        open={isOpen && !disabled}
        onBackdropClick={handleClose}
      >
        <DialogTitle disableTypography>
          <Typography variant="h2" className={classes.title}>
            {title}
          </Typography>
        </DialogTitle>
        {text && <DialogContent className={classes.text}>{text}</DialogContent>}
        <DialogActions className={classes.actions}>
          <Button color="secondary" variant="outlined" onClick={handleClose}>
            {cancelLabel}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleConfirm}
            type={type} // For example, type="submit" on form submit actions
            autoFocus
          >
            {okayLabel}
          </Button>
        </DialogActions>
      </Dialog>
      <span onClick={handleOpen}>{children}</span>
    </>
  )
}

const styles = theme => ({
  title: {
    color: theme.palette.primary.dark,
  },
  text: theme.typography.body2,
  actions: {
    padding: theme.spacing(2),
  },
})

ConfirmDialog.defaultProps = {
  okayLabel: 'Okay',
  cancelLabel: 'Cancel',
  disabled: false,
}

ConfirmDialog.propTypes = {
  classes: T.object.isRequired,
  children: T.node.isRequired,
  onConfirm: T.func.isRequired,
  title: T.string.isRequired,
  okayLabel: T.string,
  cancelLabel: T.string,
  text: T.node,
  type: T.string,
  disabled: T.bool,
  className: T.string,
}

export default withStyles(styles)(ConfirmDialog)
