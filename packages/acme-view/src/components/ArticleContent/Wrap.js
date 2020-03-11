import React from 'react'
import T from 'prop-types'
import InnerArticleContent from '.'

function ArticleContent({ content, image, page, subtitle }) {
  return (
    <InnerArticleContent
      content={content}
      image={image}
      subtitle={subtitle}
      title={page.title}
    />
  )
}

ArticleContent.propTypes = {
  content: T.string.isRequired,
  image: T.string,
  page: T.object.isRequired,
  subtitle: T.string,
}

export default ArticleContent
