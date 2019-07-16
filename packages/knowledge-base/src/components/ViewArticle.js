import React from 'react'
import { Grid, withStyles } from '@material-ui/core'

const ViewArticle = props => {
  return (
    <>
      <Grid container spacing={7}>
        <Grid item xs={3}>
          VIEWED ARTICLE SHOWS UP HERE
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(theme => ({}))(ViewArticle)
