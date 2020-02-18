import React from 'react'
import { Grid } from '@material-ui/core'
import ArticleContent from '../components/ArticleContent'
import ArticleMetadata from '../components/ArticleMetadata'

function Article({ pageContext: { article } }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <ArticleMetadata
          author={{
            image: '',
            name: 'Sunil Thawani',
            title: 'Acme Researcher',
          }}
          created={article.date_published}
          readTime={5}
          section="Latest News"
        />
      </Grid>
      <Grid item xs={7}>
        <ArticleContent
          content={article.content}
          image={article.hero_img}
          subtitle={article.subtitle}
          title={article.title}
        />
      </Grid>
    </Grid>
  )
}

export default Article
