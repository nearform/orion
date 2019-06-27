import React from 'react'
import { Grid, Button, withStyles } from '@material-ui/core'
import classnames from 'classnames'
import Icon from '@material-ui/core/Icon'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import SearchIcon from '@material-ui/icons/Search'

const NavButton = withStyles(theme => ({
  root: {
    color: theme.palette.primary.dark,
    letterSpacing: '1.75px',
    borderRadius: 0,
    paddingLeft: '15px',
  },
}))(Button)

const SubmitButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: '2px',
    marginLeft: theme.spacing(1),
  },
}))(Button)
SubmitButton.defaultProps = {
  variant: 'outlined',
  color: 'secondary',
}

function SecondaryNavigation({ classes, dark }) {
  const menuOpen = false
  const navButtonClassname = classnames({
    [classes.menuOpen]: menuOpen,
    [classes.menuDarkContrast]: dark,
  })
  return (
    <Grid container justify="flex-end" spacing={3}>
      <Grid item>
        <NavButton to="/admin" className={navButtonClassname}>
          TOPICS
          <Icon component={KeyboardArrowDown} color="secondary" />
        </NavButton>
      </Grid>
      <Grid item>
        <NavButton to="/admin" className={navButtonClassname}>
          CATEGORIES
          <Icon component={KeyboardArrowDown} color="secondary" />
        </NavButton>
      </Grid>
      <Grid item>
        <NavButton to="/admin" className={navButtonClassname}>
          SECTORS
          <Icon component={KeyboardArrowDown} color="secondary" />
        </NavButton>
      </Grid>
      <Grid item>
        <NavButton to="/admin" className={navButtonClassname}>
          <Icon component={SearchIcon} color="secondary" />
          SEARCH
        </NavButton>
      </Grid>
      <Grid item>
        <SubmitButton>Submit</SubmitButton>
      </Grid>
    </Grid>
  )
}
const styles = theme => ({
  menuOpen: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  menuDarkContrast: {
    color: theme.palette.background.paper,
  },
})

export default withStyles(styles)(SecondaryNavigation)
