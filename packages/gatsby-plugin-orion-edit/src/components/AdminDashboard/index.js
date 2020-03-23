import React from 'react'
import SideBarMenu from 'gatsby-plugin-orion-core/src/components/SideBarMenu'
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
    backgroundColor: '#204c67',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
  },
  heading: {
    marginBottom: '22px',
    color: theme.palette.common.white,
    padding: '0 16px',
  },
  content: {
    backgroundColor: theme.palette.common.white,
    flex: 1,
    margin: 0,
    padding: theme.spacing(2),
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
    display: 'block',
    overflowY: 'scroll',
    marginBottom: theme.spacing(1),
    height: '100%',
    paddingLeft: '28px',
    fondWeight: '700',
    width: drawerWidth,
    '& > div': {
      width: drawerWidth,
    },
    '& ul': {
      height: '100%',
      padding: 0,
    },
  },
}))
const AdminDashboard = ({ data, heading }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.side}>
        <h1 className={classes.heading}>{heading}</h1>
        <SideBarMenu data={data} depthIndent={20} path="/" />
      </div>
      <div className={classes.main}>
        <div className={classes.content}>
          <h1>hello</h1>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
