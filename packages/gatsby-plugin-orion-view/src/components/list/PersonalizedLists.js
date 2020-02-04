import React, { useContext, useEffect } from 'react'
import { Typography, useMediaQuery } from '@material-ui/core'
import { Cache } from 'aws-amplify'
import { useQuery, useManualQuery } from 'graphql-hooks'
import { AuthContext } from 'components'
import {
  getRecentArticles,
  getBookmarkedArticles,
  getReadArticles,
} from 'gatsby-plugin-orion-core/queries'
import { getRandomRows } from '../../utils/array'
import PromoSpot from '../PromoSpot'
import ContentSignpostGrid from '../layout/content-signpost-grid'
import ListTitle from './ListTitle'
import ThemedList from './ThemedList'

function PersonalizedLists() {
  const { getUserTokenData } = useContext(AuthContext)
  const { userId } = getUserTokenData()
  const readArticleIds = Cache.getItem('readArticles') || []

  const isMobile = useMediaQuery('(max-width: 800px)')

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

  const { recent_articles: recentArticles = [] } = recentData
  const { user_bookmarks: userBookmarks = [] } = bookmarkedData
  const { read_articles: readArticles = [] } = readData

  const hasReadArticles = readArticles.length > 0
  const lastReadArticles = hasReadArticles
    ? readArticles
    : recentArticles.slice(0, 3)

  const bookmarkedArticles =
    userBookmarks.length > 0
      ? getRandomRows(
          userBookmarks.map(article => article.bookmarked_article),
          3
        )
      : recentArticles.slice(hasReadArticles ? 0 : 3, hasReadArticles ? 3 : 6)

  return (
    <ContentSignpostGrid
      title={isMobile ? null : <ListTitle title="Just for you" />}
    >
      <ThemedList
        hideEmpty={false}
        title={readArticles.length > 0 ? 'Last Read' : 'Recent Articles'}
        articles={lastReadArticles}
      />
      <ThemedList
        hideEmpty={false}
        title={
          userBookmarks.length > 0
            ? 'Bookmarked Articles'
            : hasReadArticles
            ? 'Recent Articles'
            : ''
        }
        articles={bookmarkedArticles}
      />
      <PromoSpot
        title="EFQM Forum 2020"
        strapline="22nd & 23rd October in Lyon"
        link="http://efqmforum.org/"
      />
    </ContentSignpostGrid>
  )
}

export default PersonalizedLists
