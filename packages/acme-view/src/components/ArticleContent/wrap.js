import React from 'react'
import ArticleContent from '.'

export default function ({ page, image, content }) {
  return (
    <ArticleContent
      content={content}
      title={page.title}
      image={image}
    />
  )
}