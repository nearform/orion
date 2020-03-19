import React, { useEffect, useReducer } from 'react'
import BreadcrumbNavigation from 'gatsby-plugin-orion-core/src/components/BreadcrumbNavigation'
import TreeView from '../TreeView'
import { makeStyles } from '@material-ui/core'

const drawerWidth = 318

const useStyles = makeStyles(theme => ({
  '@global': {
    'html, body, body > div:first-child, body > div:first-child > div:first-child': {
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
    alignItems: 'center',
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

function reducer(data, { type, ...payload }) {
  const getItem = (path, data) => {
    let current = data

    for (const index of path) {
      current = current.children[index]
    }

    return current
  }

  switch (type) {
    case 'reset':
      return payload

    case 'collapse':
      const update = { ...data }
      const item = getItem(payload.path, update)

      item.collapsed = payload.collapsed

      return update

    case 'move':
      console.log(payload)

      return data

    default:
      throw new Error('Invalid action')
  }
}

function Layout({ action, breadcrumbs, children, data: initialData }) {
  const classes = useStyles()
  const [data, dispatch] = useReducer(reducer, initialData)

  useEffect(() => {
    dispatch({ type: 'reset', ...initialData })
  }, [initialData])

  return (
    <div className={classes.root}>
      <div className={classes.side}>
        <TreeView
          root={data}
          onCollapsedChange={(path, collapsed) => dispatch({ type: 'collapse', path, collapsed })}
          onMove={(srcPath, destPath) => dispatch({ type: 'move', srcPath, destPath })}
        />
      </div>
      <div className={classes.main}>
        <div className={classes.top}>
          <BreadcrumbNavigation data={breadcrumbs} />
          <div>{action}</div>
        </div>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  )
}

export default Layout
