import React from 'react'
import PropTypes from 'prop-types'
import ArticlePreview from './ArticlePreview'
import ListTitle from './ListTitle'
import ContentSingpostGrid from '../layout/content-signpost-grid'

const FeatureArticles = ({ title = '', articles = [], hideEmpty }) => {
  if (hideEmpty && !articles.length) return null
  const titleWrapped = <ListTitle title={title} />
  return (
    <ContentSingpostGrid title={titleWrapped}>
      {articles.map(article => (
        <ArticlePreview key={article.id} article={article} />
      ))}
    </ContentSingpostGrid>
  )
}

FeatureArticles.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.array,
  classes: PropTypes.object,
}

export default FeatureArticles
