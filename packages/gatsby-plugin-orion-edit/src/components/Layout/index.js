import React from 'react'
import SecondaryAppBar from 'gatsby-plugin-orion-core/src/components/SecondaryAppBar'
import SideBarMenu from 'gatsby-plugin-orion-core/src/components/SideBarMenu'
import { withStyles } from '@material-ui/core'

function Layout({ action, breadcrumbs, children, classes, data, path }) {  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBarMenu
        isFullyExpanded
        data={data}
        depthIndent={20}
        path={path}
        variant="permanent"
        className={classes.drawer}
      />
      <div style={{ flex: 1 }}>
        <SecondaryAppBar action={action} data={breadcrumbs} disablePadding />
        {children}
      </div>
    </div>
  )
}

const styles = () => ({
  drawer: {
    width: 318,
    '& > div': {
      width: 318
    }
  }
})

export default withStyles(styles)(Layout)
