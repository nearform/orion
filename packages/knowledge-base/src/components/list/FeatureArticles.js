import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from 'components'
import ArticlePreview from './ArticlePreview'
import ContentSignpostGrid from '../layout/content-signpost-grid'
import useUserBookmarks from '../../hooks/useUserBookmarks'

const FeatureArticles = ({ title = '', articles = [], hideEmpty }) => {
  const { getUserTokenData } = useContext(AuthContext)
  const { isAuthenticated } = getUserTokenData()

  const {
    fetchUserBookmarks,
    userBookmarks,
    loadingBookmarks,
  } = useUserBookmarks()

  if (hideEmpty && !articles.length) return null

  return (
    <ContentSignpostGrid title={title}>
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
  classes: PropTypes.object,
}

export default FeatureArticles
