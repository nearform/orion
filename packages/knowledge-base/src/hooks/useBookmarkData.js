import { useManualQuery } from 'graphql-hooks'
import { getArticleBookmarked } from '../queries'
import { getUserTokenData } from 'components/auth'
import get from 'lodash/get'

const useBookmarkData = articleId => {
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
