import { useContext } from 'react'
import { AuthContext, useAuthorizedQuery } from 'components'
import get from 'lodash/get'
import { getUserBookmarks } from '../queries'

const useUserBookmarks = (fullData = false) => {
  const { getUserTokenData } = useContext(AuthContext)
  const { userId } = getUserTokenData()

  const {
    data: userBookmarks,
    loading: loadingBookmarks,
    refetch: fetchUserBookmarks,
  } = useAuthorizedQuery(
    getUserBookmarks,
    { userId },
    {
      onPreFetch: () => Boolean(userId),
      onFetch: data =>
        fullData
          ? data
          : get(data, 'user_bookmarks', []).map(
              bookmark => bookmark.article_id
            ),
      onNoFetch: () => [],
    }
  )

  return {
    userBookmarks,
    loadingBookmarks,
    fetchUserBookmarks,
  }
}

export default useUserBookmarks
