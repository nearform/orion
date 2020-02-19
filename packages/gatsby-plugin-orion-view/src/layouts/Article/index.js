import React from 'react'
import { Grid } from '@material-ui/core'

function ArticleLayout({ content, metadata }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        {metadata}
      </Grid>
      <Grid item xs={7}>
        {content}
      </Grid>
    </Grid>
  )
}

export default ArticleLayout
