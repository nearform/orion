import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import { getArticlesData } from '../../../queries'
import { useQuery } from 'graphql-hooks'
import ArticleSummary from '../../content/ArticleSummary'
import column from '../../layout/flex-with-gap/column'
import ListTitle from '../ListTitle'

const useMostRecentArticlesStyles = makeStyles(theme => ({
  wrapper: {
    ...column(theme)(0),
    marginBottom: 0,
    marginTop: 0,
    padding: 0,
  },
}))

const MostRecentArticles = ({ className }) => {
  const { loading, data = {} } = useQuery(getArticlesData, {
    variables: {
      status: 'published',
      limit: 2,
      offset: 0,
      orderBy: { created_at: 'desc' },
    },
  })

  const { wrapper } = useMostRecentArticlesStyles()

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  const { article: articles } = data
  return (
    <Box
      className={[className, wrapper].join(' ')}
      component="ul"
      data-test-id="most-recent-articles"
    >
      <ListTitle paletteColor={['grey', '800']} title="Most recent articles" />
      {articles.map(article => (
        <ArticleSummary article={article} key={`article-${article.id}`} />
      ))}
    </Box>
  )
}

export default MostRecentArticles
