import { useContext } from 'react'
//import { useManualQuery } from 'graphql-hooks'
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

  /*
  const [
    fetchUserBookmarks,
    { data: bookmarksData, loading: loadingBookmarks },
  ] = useManualQuery(getUserBookmarks, {
    variables: {
      userId,
    },
  })

  const userBookmarks = get(bookmarksData, 'user_bookmarks', []).map(
    bookmark => bookmark.article_id
  )
  */

  return {
    userBookmarks,
    loadingBookmarks,
    fetchUserBookmarks,
  }
}

export default useUserBookmarks
