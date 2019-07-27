import React from 'react'
import { withStyles, Typography } from '@material-ui/core'

const ContentOptions = ({ classes, content }) => {
  return (
    <div className={classes.wrapper}>
      <Typography variant="h4">Download PDF</Typography>
      <Typography variant="h4">Print this page</Typography>
      <Typography variant="h4">Share this article</Typography>
      <Typography variant="h4">Rate this article</Typography>
    </div>
  )
}
export default withStyles(theme => ({
  wrapper: {
    width: '304px',
    '&>*': {
      margin: '16px',
    },
  },
}))(ContentOptions)
