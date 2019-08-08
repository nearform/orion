import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getArticlesSearchResults } from '../../queries'
import { Grid } from '@material-ui/core'
import ArticleSummary from './ArticleSummary'

const extractArticleData = data => {
  const summaries = []
  const taxonomyIds = []
  if (data !== undefined) {
    data.search_article.map(item => {
      summaries.push(
        <ArticleSummary key={'article_id_' + item.id} article={item} />
      )
      taxonomyIds.push(
        ...item.taxonomy_items.map(({ taxonomy_id }) => taxonomy_id)
      )
    })
  }
  return { taxonomyIds, summaries }
}

const buildWhereClause = tax => {
  const clause = {
    //FOR TESTING, CAN SELECT ALL STATUS TYPES BY UNCOMMENTING BELOW
    //status: { _in: ['in-progress', 'in-review', 'published'] },
    //IF ABOVE IS UNCOMMENTED, COMMENT OUT BELOW
    status: { _eq: 'published' },
  }
  if (tax.length >= 1) {
    clause.taxonomy_items = { taxonomy_id: { _in: tax } }
  }

  return clause
}

const SearchResults = ({ term, taxonomy = [], callback, offset }) => {
  const { data: articleData } = useQuery(getArticlesSearchResults, {
    variables: {
      titleLike: term,
      limit: 10,
      offset: offset,
      whereClause: buildWhereClause(taxonomy),
    },
    useCache: false,
  })

  //TODO: nicer loading indication
  if (!articleData) return null

  const { taxonomyIds, summaries } = extractArticleData(articleData)
  const totalResults = articleData.search_article_aggregate.aggregate.count
  const range = totalResults >= 10 ? 10 : totalResults
  callback({ taxonomyIds, totalResults, range })

  return (
    <>
      <Grid item xs={8}>
        {summaries}
      </Grid>
    </>
  )
}

export default SearchResults
