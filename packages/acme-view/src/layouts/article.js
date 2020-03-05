import React from 'react'
import T from 'prop-types'
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

ArticleLayout.propTypes = {
  content: T.node.isRequired,
  metadata: T.node.isRequired,
}

export default ArticleLayout
