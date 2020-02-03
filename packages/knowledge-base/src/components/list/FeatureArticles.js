import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from 'components'
import ContentSignpostGrid from '../layout/content-signpost-grid'
import useUserBookmarks from '../../hooks/useUserBookmarks'
import ArticlePreview from './ArticlePreview'
import ListTitle from './ListTitle'

const FeatureArticles = ({ title = '', articles = [], hideEmpty }) => {
  const { getUserTokenData } = useContext(AuthContext)
  const { isAuthenticated } = getUserTokenData()

  const {
    fetchUserBookmarks,
    userBookmarks,
    loadingBookmarks,
  } = useUserBookmarks()

  if (hideEmpty && articles.length === 0) return null

  return (
    <ContentSignpostGrid title={<ListTitle title={title} />}>
      {articles.map(article => (
        <ArticlePreview
          key={article.id}
          article={article}
          bookmarked={userBookmarks.includes(article.id)}
          bookmarkDisabled={!isAuthenticated || loadingBookmarks}
          onBookmarkToggle={fetchUserBookmarks}
        />
      ))}
    </ContentSignpostGrid>
  )
}

FeatureArticles.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.array,
  hideEmpty: PropTypes.bool,
}

export default FeatureArticles
