import React from 'react'
import layouts from 'acme-view/src/layouts'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  head: {
    width: '100%',
    height: '8%',
    backgroundColor: theme.palette.primary.main,
  },
  main: {
    flex: 1,
    backgroundColor: theme.palette.grey['300'],
    margin: '2%',
    borderRadius: 8,
  },
}))

function SectionExample() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.head} />
      <div className={classes.main} />
    </div>
  )
}

export default {
  blocks: ['main'],
  editor: layouts.section,
  example: SectionExample,
  name: 'Section overview',
  preview: layouts.section,
}
