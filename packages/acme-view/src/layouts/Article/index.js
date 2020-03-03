import React from 'react'
import T from 'prop-types'
import Layout from '../../components/Layout'
import { Grid } from '@material-ui/core'

function ArticleLayout({ content, metadata, page }) {
  return (
    <Layout page={page}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          {metadata}
        </Grid>
        <Grid item xs={7}>
          {content}
        </Grid>
      </Grid>
    </Layout>
  )
}

ArticleLayout.propTypes = {
  content: T.node.isRequired,
  metadata: T.node.isRequired,
  page: T.object.isRequired,
}

export default ArticleLayout
