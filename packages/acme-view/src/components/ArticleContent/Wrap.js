import React from 'react'
import T from 'prop-types'
import InnerArticleContent from '.'

function ArticleContent({ page, image, content }) {
  return (
    <InnerArticleContent content={content} title={page.title} image={image} />
  )
}

ArticleContent.propTypes = {
  content: T.string.isRequired,
  image: T.string,
  page: T.object.isRequired,
}

export default ArticleContent
