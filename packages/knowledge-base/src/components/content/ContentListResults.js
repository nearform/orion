import React from 'react'
import { useQuery } from 'graphql-hooks'
import { sortTaxonomyIdsByType } from '../../utils/taxonomy'
import useTaxonomies from '../../hooks/useTaxonomies'
import {
  getArticlesSearchResults,
  getArticlesCategoryResults,
} from '../../queries'
import { Grid } from '@material-ui/core'
import ArticleSummary from './ArticleSummary'

const PAGE_SIZE = 10

const extractArticleData = data => {
  const summaries = []
  const taxonomyIds = []
  if (data === undefined) return { summaries, taxonomyIds }
  for (let item of data) {
    summaries.push(
      <ArticleSummary key={'article_id_' + item.id} article={item} />
    )
    taxonomyIds.push(
      ...item.taxonomy_items.map(({ taxonomy_id }) => taxonomy_id)
    )
  }
  return { taxonomyIds, summaries }
}

const buildWhereClause = (cat, tax, taxonomyTypes) => {
  const clause = {
    status: { _eq: 'published' },
    _and: [],
  }
  cat
    ? clause._and.push({
        taxonomy_items: { taxonomy: { key: { _ilike: cat } } },
      })
    : null
  if (tax.length >= 1) {
    const sortedTax = sortTaxonomyIdsByType(taxonomyTypes, tax)
    for (let type in sortedTax) {
      if (sortedTax[type].length >= 1) {
        clause._and.push({
          taxonomy_items: { taxonomy_id: { _in: sortedTax[type] } },
        })
      }
    }
  }

  return clause
}

const ContentListResults = ({ term, cat, taxonomy = [], callback, offset }) => {
  const taxonomyTypes = useTaxonomies()
  const vars = {
    whereClause: buildWhereClause(cat, taxonomy, taxonomyTypes),
    limit: PAGE_SIZE,
    offset: offset,
  }
  term ? (vars.titleLike = term) : null
  const { data: articleData } = useQuery(
    term ? getArticlesSearchResults : getArticlesCategoryResults,
    {
      variables: vars,
      useCache: false,
    }
  )

  //TODO: nicer loading indication
  if (!articleData) return null

  const { taxonomyIds, summaries } = extractArticleData(
    articleData.search_article || articleData.article
  )
  const resultsAggregate =
    articleData.search_article_aggregate || articleData.article_aggregate
  const totalResults = resultsAggregate.aggregate.count
  const range = Math.min(totalResults, PAGE_SIZE)
  callback({ taxonomyIds, totalResults, range })

  return (
    <>
      <Grid item xs={8}>
        {summaries}
      </Grid>
    </>
  )
}

export default ContentListResults
