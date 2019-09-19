import React from 'react'
import { Typography, withStyles } from '@material-ui/core'
import T from 'prop-types'

function Heading({ children, classes }) {
  return (
    <Typography className={classes.headingWrapper} component="h2">
      {children}
    </Typography>
  )
}

Heading.propTypes = {
  children: T.any.isRequired,
  classes: T.object.isRequired,
}

const styles = theme => ({
  headingWrapper: {
    color: theme.palette.primary.dark,
    display: 'flex',
    fontSize: '12px',
    fontWeight: '900',
    textTransform: 'uppercase',
  },
})

export default withStyles(styles)(Heading)
