import React from 'react'

import getSearchQuery from 'gatsby-plugin-orion-core/src/queries/base-search.graphql'
import { useViewComponents } from '../ViewComponentProvider'
import { useQuery } from 'graphql-hooks'
import ArticleList from '../ArticleList'

const getContents = ({ contents, block, value, fallback = '' } = {}) => {
  if (!contents || !block || !value) {
    return fallback
  }

  const content = contents.find((c = {}) => c.block === block)
  return (content && content.props && content.props[value]) || fallback
}

function SearchPageProvider({ location, pageContext }) {
  const { layouts } = useViewComponents()
  const searchTerm = location.search
    .replace('?', '')
    .split('&')
    .find(s => s.indexOf('term=') === 0)
    .replace('term=', '')

  const { data, loading } = useQuery(getSearchQuery, {
    variables: {
      term: `%${searchTerm}%`,
      limit: 30,
      isFullSearch: true,
    },
  })

  const { page } = pageContext
  if (loading && page === null) {
    return <h1>Loading</h1>
  }

  const results = data && data.results

  if (!results || !page) {
    return <h1>Error</h1>
  }

  if (results.length === 0) {
    return <h1>No pages or articles matched the given search parameters.</h1>
  }

  const Layout = layouts[page.layout]

  return (
    <Layout
      breadcrumbs={() => [{ title: 'taerhnt', to: 'treinh' }]}
      main={
        <ArticleList
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
