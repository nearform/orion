import React from 'react'
import ArticleList from 'gatsby-plugin-orion-view/src/components/ArticleList'

export default function({
  title,
  withFeatured,
  suppressImage,
  suppressSummary,
  clipImage,
  type,
}) {
  return (
    <ArticleList
      title={title}
      type={type}
      options={{
        withFeatured,
        suppressImage,
        suppressSummary,
        clipImage,
      }}
    />
  )
}
