import { useManualQuery } from 'graphql-hooks'
import { getArticleBookmarked } from '../queries'
import { useUserId } from '../utils/auth'
import get from 'lodash/get'

const useBookmarkData = articleId => {
  const userId = useUserId()

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
