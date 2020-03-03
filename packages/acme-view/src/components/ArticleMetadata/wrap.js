import React from 'react'
import T from 'prop-types'
import InnerArticleMetadata from '.'

function ArticleMetadata({ page, readTime }) {
  return (
    <InnerArticleMetadata
      author={{
        title: page.authors[0].user.title,
        name: page.authors[0].user.given_name,
        image: page.authors[0].user.avatar,
      }}
      created={page.published}
      readTime={readTime}
      section={page.ancestry[page.ancestry.length - 1].ancestor.title}
    />
  )
}

ArticleMetadata.propTypes = {
  page: T.object.isRequired,
  readTime: T.number.isRequired,
}

export default ArticleMetadata
