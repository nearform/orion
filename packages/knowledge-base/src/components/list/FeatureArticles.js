import React from 'react'
import PropTypes from 'prop-types'
import ArticlePreview from './ArticlePreview'
import ListTitle from './ListTitle'
import ContentSignpostGrid from '../layout/content-signpost-grid'

const FeatureArticles = ({ title = '', articles = [], hideEmpty }) => {
  if (hideEmpty && !articles.length) return null
  const titleWrapped = <ListTitle title={title} />
  return (
    <ContentSignpostGrid title={titleWrapped}>
      {articles.map(article => (
        <ArticlePreview key={article.id} article={article} />
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
