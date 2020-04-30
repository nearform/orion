import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import PageTree from '../PageTree'
import { makeStyles } from '@material-ui/core'
import getParentPath from '../../utils/get-parent-path'

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
  path: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap',
    marginRight: '16px',
    fontFamily: theme.typography.fontFamily,

    '& label': {
      color: theme.palette.common.white,
      fontSize: '16px',
      marginRight: '8px',
      whiteSpace: 'nowrap',
      fontWeight: '700',
    },

    '& span': {
      color: theme.palette.common.white,
      fontSize: '16px',
      whiteSpace: 'nowrap',
    },
    '& input': {
      fontFamily: theme.typography.fontFamily,
      marginLeft: '4px',
      color: theme.palette.common.black,
      fontSize: '16px',
      borderRadius: '3px',
      border: 'none',
      padding: '3.5px 4px 2px',

      '&:focus': {
        outlineColor: theme.palette.action.main,
      },
    },
  },
}))

function Layout({ action, children, path, setPath, ancestry }) {
  const classes = useStyles()

  const parentPath = useMemo(() => {
    return getParentPath(ancestry)
  }, [ancestry])

  return (
    <div className={classes.root}>
      <div className={classes.side}>
        <PageTree />
      </div>
      <div className={classes.main}>
        <div className={classes.top}>
          {action && (
            <div className={classes.path}>
              <label htmlFor="edit-path-path-input">Path:</label>
              <span>{parentPath}</span>
              <span>/</span>
              <input
                value={path}
                id="edit-path-path-input"
                onChange={({ target }) => setPath(target.value)}
              />
            </div>
          )}
          <div>{action}</div>
        </div>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  action: PropTypes.node,
  ancestry: PropTypes.arrayOf(
    PropTypes.shape({
      ancestor: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  children: PropTypes.node,
  path: PropTypes.string,
  setPath: PropTypes.func.isRequired,
}

Layout.defaultProps = {
  children: '',
  path: '',
  action: null,
}

export default Layout
