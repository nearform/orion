import React from 'react'
import { makeStyles } from '@material-ui/core'

const drawerWidth = 200

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
  heading: {
    marginBottom: '22px',
    color: theme.palette.common.white,
    padding: '0 16px',
  },
  main: {
    backgroundColor: theme.palette.common.white,
    margin: 0,
    position: 'relative',
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
    display: 'flex',
    height: 64,
    background: theme.palette.background.dark,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(0, 1, 1, 0),
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[3],
  },
  panel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4rem',
  },
  errorCode: {
    fontSize: '10rem',
    color: '#333333',
  },
  column: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    padding: '1.5rem',
    marginTop: '1rem',
  },
}))

export default () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.side}>
        <h1 className={classes.heading}>Acme</h1>
      </div>

      <div className={classes.main}>
        <div className={classes.top} />
        <div className={classes.content}>
          <div className={classes.panel}>
            <span className={classes.errorCode}>401</span>
            <div className={classes.column}>
              <h1>NOT AUTHORISED</h1>
              <p>
                Sorry, but you are not authorised to access this page. Please
                contact your service administrator if you believe this is
                incorrect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
