import T from 'prop-types'
import { useQuery } from 'graphql-hooks'
import { getArticleBookmarked } from '../queries'
import { useUserId } from '../utils/auth'
import get from 'lodash/get'

const useBookmarkData = articleId => {
  const userId = useUserId()

  const {
    data: articleBookmarkedData,
    refetch: refetchArticleBookmarked,
    loading: loadingBookmarked,
  } = useQuery(getArticleBookmarked, {
    variables: {
      articleId: articleId,
      userId,
    },
  })

  const articleBookmarked =
    get(articleBookmarkedData, 'bookmarked_aggregate.aggregate.count') > 0

  return { articleBookmarked, refetchArticleBookmarked, loadingBookmarked }
}

useBookmarkData.propTypes = {
  articleId: T.number.isRequired,
}

export default useBookmarkData
