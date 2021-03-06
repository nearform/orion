import React from 'react'
import PropTypes from 'prop-types'
import PageTree from '../PageTree'
import { makeStyles } from '@material-ui/core'

const drawerWidth = 318

const useStyles = makeStyles(theme => ({
  '@global': {
    'html, body, body > div:first-child, body > div:first-child > div:first-child, body > div:first-child > div:first-child > div:first-child': {
      height: '100%',
    },
    body: {
      overflowY: 'hidden',
    },
  },
  root: {
    backgroundColor: '#2f4756',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
  },
  content: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[3],
    flex: 1,
    margin: theme.spacing(0, 1, 1, 0),
    overflowY: 'scroll',
    position: 'relative',
  },
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginLeft: -17,
    zIndex: 1,
  },
  side: {
    overflowX: 'hidden',
    overflowY: 'scroll',
    marginBottom: theme.spacing(1),
    marginTop: 62,
    width: drawerWidth,
  },
  top: {
    alignItems: 'top',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 32px',
    '& a': {
      ...theme.typography.h5,
      color: theme.palette.common.white,
      fontSize: '16px',
    },
    '& svg': {
      color: theme.palette.tertiary.main,
    },
  },
}))

function Layout({ action, children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.side}>
        <PageTree />
      </div>
      <div className={classes.main}>
        <div className={classes.top}>
          <div>{action}</div>
        </div>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
}

Layout.defaultProps = {
  children: '',
  action: null,
}

export default Layout
