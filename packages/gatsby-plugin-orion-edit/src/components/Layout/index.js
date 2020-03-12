import React from 'react'
import BreadcrumbNavigation from 'gatsby-plugin-orion-core/src/components/BreadcrumbNavigation'
import SideBarMenu from 'gatsby-plugin-orion-core/src/components/SideBarMenu'
import { makeStyles } from '@material-ui/core'

const drawerWidth = 318

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      overflowY: 'hidden',
    },
  },
  root: {
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
    backgroundColor: '#2f4756',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginLeft: -17,
    zIndex: 1,
  },
  side: {
    backgroundColor: '#2f4756',
    overflowY: 'scroll',
    paddingTop: 62,
    width: drawerWidth,
    '& > div': {
      width: drawerWidth,
    },
    '& ul': {
      height: '100%',
      padding: 0,
    },
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

function Layout({ action, breadcrumbs, children, data, path }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.side}>
        <SideBarMenu isFullyExpanded data={data} depthIndent={20} path={path} />
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
