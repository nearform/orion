import React from 'react'
import T from 'prop-types'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 4),
    },
    [theme.breakpoints.up('md')]: {
      margin: 'auto',
      maxWidth: 1120,
    },
  },
}))

function PaddedContainer({ className, ...props }) {
  const classes = useStyles()

  return <div className={clsx(classes.root, className)} {...props} />
}

PaddedContainer.propTypes = {
  className: T.string,
}

export default PaddedContainer
