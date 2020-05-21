import React from 'react'
import PropTypes from 'prop-types'
import SideBarMenu from 'gatsby-plugin-orion-core/src/components/SideBarMenu'
import { makeStyles } from '@material-ui/core'
import MenuCard from '../MenuCard'
import GridList from '@material-ui/core/GridList'
import { checkIfAuthenticated } from 'gatsby-plugin-orion-core/src/utils/amplify'

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
    backgroundColor: theme.palette.secondary.main,
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
    overflowY: 'scroll',
    position: 'relative',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginLeft: -17,
    zIndex: 1,
  },
  gridList: {
    padding: theme.spacing(2),
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
  top: {
    background: theme.palette.background.dark,
    height: 64,
  },
}))

const AdminDashboard = ({ data, heading, content }) => {
  checkIfAuthenticated()

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.side}>
        <h1 className={classes.heading}>{heading}</h1>
        <SideBarMenu data={data} depthIndent={20} path="/" />
      </div>
      <div className={classes.main}>
        <div className={classes.top} />
        <GridList cellHeight={256} className={classes.gridList} cols={3}>
          {content &&
            content.map(menuItem => (
              <MenuCard {...menuItem} key={menuItem.label} />
            ))}
        </GridList>
      </div>
    </div>
  )
}

AdminDashboard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      iconClass: PropTypes.string,
      to: PropTypes.string,
    })
  ).isRequired,
  heading: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      src: PropTypes.string,
      to: PropTypes.string,
    })
  ).isRequired,
}

export default AdminDashboard
