import React, { useMemo } from 'react'
import ArticleList from 'gatsby-plugin-orion-view/src/components/ArticleList'
import { useQuery } from 'graphql-hooks'

import getArticleListQuery from '../../queries/get-article-list'

export default function({
  title,
  withFeatured,
  suppressImage,
  suppressSummary,
  clipImage,
  type,
}) {
  const { data, loading } = useQuery(getArticleListQuery)

  const articles = useMemo(() => {
    if (loading || data.orion_page.length === 0) {
      return []
    }

    return data.orion_page.map(item => {
      let image = process.env.GATSBY_PLACEHOLDER_IMAGE
      let summary = ''

      if (item.contents.length > 0) {
        item.contents.forEach(content => {
          switch (content.block) {
            case 'summary':
              summary = content.props.content
              break
            case 'listImage':
              image = content.props.image
              break
            default:
          }
        })
      }

      return {
        id: item.id,
        image,
        title: item.title,
        summary,
        path: item.path,
        published: item.published,
      }
    })
  }, [data, loading])

  return (
    <ArticleList
      articles={articles}
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
