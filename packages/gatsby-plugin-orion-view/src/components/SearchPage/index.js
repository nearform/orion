import React from 'react'

import getSearchQuery from 'gatsby-plugin-orion-core/src/queries/base-search.graphql'
import { useViewComponents } from '../ViewComponentProvider'
import { useQuery } from 'graphql-hooks'
import ArticleList from '../ArticleList'

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
      main={
        <ArticleList
          articles={results}
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
