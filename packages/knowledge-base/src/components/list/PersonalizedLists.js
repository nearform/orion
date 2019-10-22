import React, { useContext, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { Cache } from 'aws-amplify'
import { useQuery, useManualQuery } from 'graphql-hooks'
import { AuthContext } from 'components'
import { getRandomRows } from '../../utils/array'
import ThemedList from './ThemedList'
import PromoSpot from '../PromoSpot'
import {
  getRecentArticles,
  getBookmarkedArticles,
  getReadArticles,
} from '../../queries'
import ContentSignpostGrid from '../layout/content-signpost-grid'

function PersonalizedLists() {
  const { getUserTokenData } = useContext(AuthContext)
  const { userId } = getUserTokenData()
  const readArticleIds = Cache.getItem('x-readArticles') || []

  const { loading: recentLoading, data: recentData = {} } = useQuery(
    getRecentArticles
  )
  const [
    fetchBookmarked,
    { loading: bookmarkedLoading, data: bookmarkedData = {} },
  ] = useManualQuery(getBookmarkedArticles, {
    variables: {
      userId,
    },
  })
  const { loading: readLoading, data: readData = {} } = useQuery(
    getReadArticles,
    {
      variables: {
        ids: readArticleIds,
      },
    }
  )

  useEffect(() => {
    // Only load bookmarked articles if a userId is present.
    if (userId) {
      fetchBookmarked()
    }
  }, [fetchBookmarked, userId])

  if (recentLoading || bookmarkedLoading || readLoading) {
    return <Typography>Loading...</Typography>
  }

  const { recent_articles = [] } = recentData
  const { user_bookmarks = [] } = bookmarkedData
  const { read_articles = [] } = readData

  const hasReadArticles = read_articles.length > 0
  const readArticles = hasReadArticles
    ? read_articles
    : recent_articles.slice(0, 3)

  const bookmarkedArticles =
    user_bookmarks.length > 0
      ? getRandomRows(
          user_bookmarks.map(article => article.bookmarked_article),
          3
        )
      : recent_articles.slice(hasReadArticles ? 0 : 3, hasReadArticles ? 3 : 6)

  return (
    <ContentSignpostGrid title="Just for you">
      <ThemedList
        hideEmpty={false}
        title={read_articles.length > 0 ? 'Last Read' : 'Recent Articles'}
        articles={readArticles}
      />
      <ThemedList
        hideEmpty={false}
        title={
          user_bookmarks.length > 0
            ? 'Bookmarked Articles'
            : hasReadArticles
            ? 'Recent Articles'
            : ''
        }
        articles={bookmarkedArticles}
      />
      <PromoSpot
        title="EFQM Forum 2019"
        strapline="23rd October 2019 in Helsinki"
        link="http://efqmforum.org/"
      />
    </ContentSignpostGrid>
  )
}

export default PersonalizedLists
