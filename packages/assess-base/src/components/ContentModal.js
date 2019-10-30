import React from 'react'
import T from 'prop-types'
import classnames from 'classnames'
import ReactMarkdown from 'react-markdown'
import {
  makeStyles,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Clear } from '@material-ui/icons'

const useContentModalStyles = makeStyles(theme => ({
  paper: ({ width }) => ({
    width,
    maxWidth: theme.spacing(120),
  }),
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
  subTitle: {
    color: theme.palette.primary.dark,
    marginTop: theme.spacing(1.5),
  },
  title: {
    fontWeight: 700,
    width: `calc(100% - ${theme.spacing(3)})`,
  },
  titleText: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  closeX: {
    padding: 0,
  },
}))

function ContentModal({
  children,
  className,
  color,
  mdContent,
  onClose,
  open = true,
  subTitle,
  title,
  width = '85%',
}) {
  const classes = useContentModalStyles({ width })
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: classnames(className, classes.paper),
      }}
    >
      <DialogTitle disableTypography className={classes.titleSection}>
        <Box className={classes.titleText}>
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
          {subTitle && (
            <Typography variant="h4" className={classes.subTitle}>
              {subTitle}
            </Typography>
          )}
        </Box>
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

ContentModal.propTypes = {
  children: T.node,
  className: T.any,
  onClose: T.func.isRequired,
  title: T.string.isRequired,
  mdContent: T.string,
}

export default ContentModal
