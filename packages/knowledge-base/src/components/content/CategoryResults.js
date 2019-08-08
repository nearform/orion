import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getArticlesCategoryResults } from '../../queries'
import { Grid } from '@material-ui/core'
import ArticleSummary from './ArticleSummary'

const extractArticleData = data => {
  const summaries = []
  const taxonomyIds = []
  if (data !== undefined) {
    data.article.map(item => {
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

const buildWhereClause = (cat, tax) => {
  const clause = {
    //FOR TESTING, CAN SELECT ALL STATUS TYPES BY UNCOMMENTING BELOW
    //status: { _in: ['in-progress', 'in-review', 'published'] },
    //IF ABOVE IS UNCOMMENTED, COMMENT OUT BELOW
    status: { _eq: 'published' },
    _and: [{ taxonomy_items: { taxonomy: { key: { _ilike: cat } } } }],
  }
  if (tax.length > 0) {
    clause._and.push({ taxonomy_items: { taxonomy_id: { _in: tax } } })
  }
  return clause
}

const CategoryResults = ({ cat, taxonomy = [], callback, offset }) => {
  const { data: articleData } = useQuery(getArticlesCategoryResults, {
    variables: {
      whereClause: buildWhereClause(cat, taxonomy),
      limit: 10,
      offset: offset,
    },
    useCache: false,
  })

  //TODO: nicer loading indication
  if (!articleData) return null

  const { taxonomyIds, summaries } = extractArticleData(articleData)
  const totalResults = articleData.article_aggregate.aggregate.count
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

export default CategoryResults
