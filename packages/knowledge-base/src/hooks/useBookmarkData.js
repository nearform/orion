import { useContext } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { getArticleBookmarked } from '../queries'
import { AuthContext } from 'components'
import get from 'lodash/get'

const useBookmarkData = articleId => {
  const { getUserTokenData } = useContext(AuthContext)
  const { userId } = getUserTokenData()

  const [
    fetchArticleBookmarked,
    { data: articleBookmarkedData, loading: loadingBookmarked },
  ] = useManualQuery(getArticleBookmarked, {
    variables: {
      articleId,
      userId,
    },
  })

  const articleBookmarked =
    get(articleBookmarkedData, 'bookmarked_aggregate.aggregate.count') > 0

  return {
    fetchArticleBookmarked,
    articleBookmarked,
    loadingBookmarked,
  }
}

export default useBookmarkData
