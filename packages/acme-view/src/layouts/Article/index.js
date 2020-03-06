import React from 'react'
import Layout from '../../components/Layout'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import { Grid } from '@material-ui/core'

function ArticleLayout({ content, metadata, page, menu }) {
  return (
    <Layout page={page} menu={menu}>
      <PaddedContainer>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            {metadata}
          </Grid>
          <Grid item xs={7}>
            {content}
          </Grid>
        </Grid>
      </PaddedContainer>
    </Layout>
  )
}

export default ArticleLayout
