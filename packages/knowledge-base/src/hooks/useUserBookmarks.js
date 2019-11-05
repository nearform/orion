import { useContext } from 'react'
import { getUserBookmarks } from '../queries'
import { AuthContext, useAuthorizedQuery } from 'components'
import get from 'lodash/get'

const useUserBookmarks = () => {
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
      onPreFetch: () => !!userId,
      onFetch: data =>
        get(data, 'user_bookmarks', []).map(bookmark => bookmark.article_id),
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
