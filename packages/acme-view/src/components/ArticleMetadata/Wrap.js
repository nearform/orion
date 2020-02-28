import React from 'react'
import ArticleMetadata from '.'

export default function({ page, readTime }) {
  return (
    <ArticleMetadata
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
