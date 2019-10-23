import { useContext } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { getUserBookmarks } from '../queries'
import { AuthContext } from 'components'
import get from 'lodash/get'

const useUserBookmarks = () => {
  const { getUserTokenData } = useContext(AuthContext)
  const { userId } = getUserTokenData()

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

  return {
    fetchUserBookmarks,
    userBookmarks,
    loadingBookmarks,
  }
}

export default useUserBookmarks
