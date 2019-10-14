import React from 'react'
import { Cache } from 'aws-amplify'
import get from 'lodash/get'
import { useQuery } from 'graphql-hooks'
import { getUserTokenData } from '../../auth'
import { getRandomRows } from '../../utils/array'
import ThemedList from './ThemedList'
import ListTitle from './ListTitle'
import PromoSpot from '../PromoSpot'
import {
  getRecentArticles,
  getBookmarkedArticles,
  getReadArticles,
} from '../../queries'
import ContentSignpostGrid from '../layout/content-signpost-grid'

function PersonalizedLists() {
  const { userId } = getUserTokenData()
  const readArticleIds = Cache.getItem('readArticles') || []
  const { data: recentArticlesData } = useQuery(getRecentArticles)
  const { data: bookmarkedArticlesData } = useQuery(getBookmarkedArticles, {
    variables: {
      userId: userId,
    },
  })
  const { data: readArticlesData } = useQuery(getReadArticles, {
    variables: {
      ids: readArticleIds,
    },
  })

  //TODO: nicer loading indication
  if (!recentArticlesData || !bookmarkedArticlesData || !readArticlesData)
    return null

  const readArticles =
    readArticlesData.read_articles.length > 0
      ? readArticlesData.read_articles
      : recentArticlesData.recent_articles

  const bookmarkedArticles =
    bookmarkedArticlesData.user_bookmarks.length > 0
      ? getRandomRows(
          bookmarkedArticlesData.user_bookmarks.map(
            article => article.bookmarked_article
          ),
          3
        )
      : recentArticlesData.recent_articles

  return (
    <ContentSignpostGrid title={<ListTitle title="Just for you" />}>
      <ThemedList
        hideEmpty
        title={
          readArticlesData.read_articles.length > 0
            ? 'Last Read'
            : 'Recent Articles'
        }
        articles={get(
          { read_articles: readArticles.splice(0, 3) },
          'read_articles',
          []
        )}
      />
      <ThemedList
        hideEmpty
        title={
          bookmarkedArticlesData.user_bookmarks.length > 0
            ? 'Bookmarked Articles'
            : 'Recent Articles'
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
