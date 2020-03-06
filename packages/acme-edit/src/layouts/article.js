import React from 'react'
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
    display: 'flex',
  },
  metadata: {
    height: '30%',
    width: '20%',
    backgroundColor: theme.palette.grey['300'],
    margin: '2%',
    borderRadius: 8,
  },
  content: {
    height: '96%',
    flex: 1,
    backgroundColor: theme.palette.grey['300'],
    margin: '2%',
    borderRadius: 8,
  }
}))

export function ArticleExample() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.head} />
      <div className={classes.main}>
        <div className={classes.metadata} />
        <div className={classes.content} />
      </div>
    </div>
  )
}