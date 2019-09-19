import React from 'react'
import { Box, withStyles, Typography } from '@material-ui/core'
import T from 'prop-types'

function HeadedSubSection({ body, classes, title }) {
  return (
    <Box className={classes.layoutWrapper} component="div">
      <Typography className={classes.heading} component="h3">
        {title}
      </Typography>
      {body}
    </Box>
  )
}

HeadedSubSection.propTypes = {
  classes: T.object.isRequired,
}

const styles = theme => ({
  layoutWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(3),
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  heading: {
    fontSize: '12px',
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
  },
})

export default withStyles(styles)(HeadedSubSection)
