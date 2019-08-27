import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'

const ListTitle = ({ classes, title = '' }) => {
  return (
    <Typography variant="h3" className={classes.title}>
      {title}
    </Typography>
  )
}

ListTitle.propTypes = {
  title: PropTypes.string,
}

const styles = theme => ({
  title: {
    borderTopWidth: '8px',
    borderTopColor: theme.palette.primary.light,
    borderTopStyle: 'solid',
    paddingTop: theme.spacing(0.5),
  },
})

export default withStyles(styles)(ListTitle)
