import React, { useContext } from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import { AuthContext } from 'components'
import { useQuery } from 'graphql-hooks'
import { getArticlesData } from 'gatsby-plugin-orion-core/queries'
import useUserBookmarks from 'gatsby-plugin-orion-core/hooks/useUserBookmarks'
import ArticleSummary from '../../content/ArticleSummary'
import column from '../../layout/utils/flex-with-gap/column'
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
  const { getUserTokenData } = useContext(AuthContext)
  const { isAuthenticated } = getUserTokenData()

  const {
    fetchUserBookmarks,
    userBookmarks,
    loadingBookmarks,
  } = useUserBookmarks()

  const { loading, data = {} } = useQuery(getArticlesData, {
    variables: {
      status: 'published',
      limit: 2,
      offset: 0,
      orderBy: { created_at: 'desc' }, // eslint-disable-line camelcase
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
        <ArticleSummary
          key={`article-${article.id}`}
          article={article}
          bookmarked={userBookmarks.includes(article.id)}
          bookmarkButtonDisabled={!isAuthenticated || loadingBookmarks}
          onBookmarkToggle={fetchUserBookmarks}
        />
      ))}
    </Box>
  )
}

export default MostRecentArticles
