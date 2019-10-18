import React, { useContext, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { Cache } from 'aws-amplify'
import get from 'lodash/get'
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
  const readArticleIds = Cache.getItem('readArticles') || []

  const { recentLoading, recentData = {} } = useQuery(getRecentArticles)
  const [
    fetchBookmarked,
    { bookmarkedLoading, bookmarkedData = {} },
  ] = useManualQuery(getBookmarkedArticles, {
    variables: {
      userId,
    },
  })
  const { readLoading, readData = {} } = useQuery(getReadArticles, {
    variables: {
      ids: readArticleIds,
    },
  })

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

  const readArticles =
    read_articles.length > 0 ? read_articles : recent_articles

  const bookmarkedArticles =
    user_bookmarks.length > 0
      ? getRandomRows(
          user_bookmarks.map(article => article.bookmarked_article),
          3
        )
      : recent_articles

  return (
    <ContentSignpostGrid title="Just for you">
      <ThemedList
        hideEmpty
        title={read_articles.length > 0 ? 'Last Read' : 'Recent Articles'}
        articles={get(
          { read_articles: readArticles.splice(0, 3) },
          'read_articles',
          []
        )}
      />
      <ThemedList
        hideEmpty
        title={
          user_bookmarks.length > 0 ? 'Bookmarked Articles' : 'Recent Articles'
        }
        articles={get(
          { bookmarked_articles: bookmarkedArticles.splice(0, 3) },
          'bookmarked_articles',
          []
        )}
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
