import React from 'react'

import getSearchQuery from 'gatsby-plugin-orion-core/src/queries/base-search.graphql'
import { useViewComponents } from '../ViewComponentProvider'
import { useQuery } from 'graphql-hooks'
import InnerArticleList from '../InnerArticleList'

export const getContents = ({
  contents = [],
  block = '',
  value = '',
  fallback = '',
} = {}) => {
  if (contents.lenght === 0 || !block || !value) {
    return fallback
  }

  const content = contents.find((c = {}) => c.block === block)
  return (content && content.props && content.props[value]) || fallback
}

function SearchPageProvider({ location, pageContext }) {
  const { layouts } = useViewComponents()
  let searchTerm = location.search
    .replace('?', '')
    .split('&')
    .find(s => s.indexOf('term=') === 0)
  searchTerm = searchTerm ? searchTerm.replace('term=', '') : ''

  const { data, loading } = useQuery(getSearchQuery, {
    variables: {
      term: `%${searchTerm}%`,
      limit: 30,
      isFullSearch: true,
    },
  })
  const { page } = pageContext
  const results = data && data.results

  if (!results || results.length === 0) {
    return <h1>No pages or articles matched the given search parameters.</h1>
  }

  const Layout = layouts[page.layout]

  return (
    <Layout
      main={
        <InnerArticleList
          articles={results.map(({ path, id, title, contents, published }) => ({
            path,
            id,
            title,
            image: getContents({
              contents,
              block: 'content',
              value: 'image',
              fallback: '/place-8@2x.png',
            }),
            summary: getContents({
              contents,
              block: 'summary',
              value: 'content',
            }),
            published,
          }))}
          title={`Search results for: ${searchTerm}`}
          type="rows"
        />
      }
      loading={loading}
      page={page}
    />
  )
}

export default SearchPageProvider
