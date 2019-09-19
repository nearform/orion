import React from 'react'
import T from 'prop-types'
import { Box, Button, withStyles, Typography } from '@material-ui/core'
import { Link } from 'gatsby'

const Header = ({ assessment, classes }) => {
  return (
    <Box className={classes.headerWrapper} component="header">
      <Box className={classes.nav} component="nav">
        <Button
          color="secondary"
          component={Link}
          to={`/assessment/efqm-2020-advanced#${assessment.id}`}
          variant="text"
        >
          ◀ Asessment Summary
        </Button>
      </Box>
      <Box>
        <Typography className={classes.prefix}>Management Report</Typography>
        <Typography className={classes.heading} component="h1">
          {assessment.name}
        </Typography>
      </Box>
      <Button color="secondary" variant="contained">
        Download as PDF
      </Button>
    </Box>
  )
}

Header.propTypes = {
  assessment: T.object.isRequired,
  classes: T.object.isRequired,
}

const styles = theme => ({
  headerWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
  },
  heading: {
    color: theme.palette.primary.dark,
    fontSize: '18px',
    fontWeight: 700,
  },
  nav: {
    flexBasis: '100%',
    marginBottom: theme.spacing(3),
  },
  prefix: {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
})

export default withStyles(styles)(Header)
