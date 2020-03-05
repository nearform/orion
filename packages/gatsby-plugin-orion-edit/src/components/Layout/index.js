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
        <div className={classes.editor}>
          {children}
        </div>
      </div>
    </div>
  )
}

const styles = theme => ({
  content: {
    marginLeft: 318,
  },
  drawer: {
    width: 318,
    '& > div': {
      width: 318,
    },
    '& ul': {
      height: '100%',
      padding: 0,
    }
  },
  editor: {
    padding: 16,
  },
  menu: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 32px',
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
