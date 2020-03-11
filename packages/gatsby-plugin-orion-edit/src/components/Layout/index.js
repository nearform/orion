import React from 'react'
import BreadcrumbNavigation from 'gatsby-plugin-orion-core/src/components/BreadcrumbNavigation'
import SideBarMenu from 'gatsby-plugin-orion-core/src/components/SideBarMenu'
import { withStyles } from '@material-ui/core'

function Layout({ action, breadcrumbs, children, classes, data, path }) {
  return (
    <div className={classes.root}>
      <SideBarMenu
        isFullyExpanded
        data={data}
        depthIndent={20}
        path={path}
        variant="permanent"
        className={classes.drawer}
      />
      <div className={classes.content}>
        <div className={classes.menu}>
          <BreadcrumbNavigation data={breadcrumbs} />
          <div>{action}</div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

const drawerWidth = 318

const styles = theme => ({
  content: {
    marginLeft: drawerWidth,
    marginTop: 62,
  },
  drawer: {
    width: drawerWidth,
    '& > div': {
      width: drawerWidth,
    },
    '& ul': {
      height: '100%',
      padding: 0,
    },
  },
  menu: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.dark,
    boxShadow: theme.shadows[2],
    display: 'flex',
    justifyContent: 'space-between',
    left: drawerWidth,
    padding: '16px 32px',
    position: 'fixed',
    top: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    zIndex: theme.zIndex.appBar,
    '& a': {
      ...theme.typography.h5,
      color: theme.palette.action.main,
      fontSize: '16px',
    },
    '& svg': {
      color: theme.palette.tertiary.main,
    },
  },
})

export default withStyles(styles)(Layout)
