import React, { useMemo } from 'react'
import T from 'prop-types'
import InnerArticleMetadata from '.'

function ArticleMetadata({ page, readTime }) {
  const author = useMemo(() => {
    const author = {
      title: 'Sample author',
      name: 'Sample author',
      image: '',
    }

    if (page.authors.length > 0) {
      const { user } = page.authors[0]

      if (user.title) {
        author.title = user.title
      }

      if (user.given_name) {
        author.name = user.given_name
      }

      if (user.avatar) {
        author.image = user.avatar
      }
    }

    return author
  }, [page])

  const section = useMemo(() => {
    if (page.ancestry.length > 0) {
      return page.ancestry[page.ancestry.length - 1].ancestor.title
    }

    return 'Acme'
  }, [page])

  return (
    <InnerArticleMetadata
      author={author}
      created={page.published}
      readTime={readTime}
      section={section}
    />
  )
}

ArticleMetadata.propTypes = {
  page: T.object.isRequired,
  readTime: T.number.isRequired,
}

export default ArticleMetadata
