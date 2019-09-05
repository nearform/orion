import React from 'react'
import T from 'prop-types'
import classnames from 'classnames'
import ReactMarkdown from 'react-markdown'
import {
  withStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Clear } from '@material-ui/icons'

function ContentModal({
  classes,
  children,
  className,
  title,
  onClose,
  mdContent,
  color,
}) {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      classes={{
        paper: classnames(className, classes.paper),
      }}
    >
      <DialogTitle disableTypography className={classes.titleSection}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <IconButton onClick={onClose} className={classes.closeX}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <DialogContent
        className={classes.contentSection}
        style={
          color && {
            borderTopColor: color,
          }
        }
      >
        {mdContent && <ReactMarkdown>{mdContent}</ReactMarkdown>}
        {children}
      </DialogContent>
    </Dialog>
  )
}

const styles = theme => ({
  paper: {
    width: '85%',
    maxWidth: theme.spacing(120),
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 4, 1),
  },
  contentSection: {
    margin: theme.spacing(0, 4),
    padding: theme.spacing(2, 0),
    borderTopWidth: theme.spacing(0.5),
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.background.dark,
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 700,
    width: `calc(100% - ${theme.spacing(3)})`,
    flexGrow: 1,
  },
  closeX: {
    padding: 0,
  },
})

ContentModal.propTypes = {
  classes: T.object.isRequired,
  children: T.node,
  className: T.any,
  onClose: T.func.isRequired,
  title: T.string.isRequired,
  mdContent: T.string,
}

export default withStyles(styles)(ContentModal)
