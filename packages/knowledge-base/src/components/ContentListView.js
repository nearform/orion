import React, { useEffect, useMemo, useState } from 'react'
import { navigate } from 'gatsby'
import { withStyles, Grid, Typography, Button } from '@material-ui/core'
import get from 'lodash/get'
import Taxonomies from './content/Taxonomies'
import ArticleSummary from './content/ArticleSummary'
import useTaxonomies from '../hooks/useTaxonomies'
import useUserBookmarks from '../hooks/useUserBookmarks'
import {
  getArticlesSearchResults,
  getArticlesCategoryResults,
} from '../queries'
import { getTaxonomyItemByKey, buildWhereClause } from '../utils/taxonomy'
import { useAuthorizedQuery, PaddedContainer } from 'components'
import SEO from './SEO'

const PAGE_SIZE = 10
const defaultAggregate = { aggregate: { count: 0 } }

const ListContent = ({ classes, term, taxonomy, page = 1, results }) => {
  const {
    fetchUserBookmarks,
    userBookmarks,
    loadingBookmarks,
  } = useUserBookmarks()

  const taxonomyTypes = useTaxonomies()
  const [taxonomyIds, setTaxonomyIds] = useState([])
  const [touched, setTouched] = useState(false)

  const [currentPage, setCurrentPage] = useState(page)
  const offset = (currentPage - 1) * PAGE_SIZE

  const variables = useMemo(
    () => ({
      whereClause: buildWhereClause(taxonomy, taxonomyIds, taxonomyTypes),
      limit: PAGE_SIZE,
      offset,
      taxonomyKey: taxonomy,
      ...(term && { titleLike: term }),
    }),
    [taxonomy, taxonomyIds, taxonomyTypes, offset, term]
  )

  const isPreRendered = !(touched || term || taxonomy)

  const formatData = data => {
    return {
      articles: get(data, 'article') || get(data, 'search_article') || [],
      aggregate:
        get(data, 'article_aggregate') ||
        get(data, 'search_article_aggregate') ||
        defaultAggregate,
      taxonomy: get(data, 'taxonomy'),
    }
  }

  const { data } = useAuthorizedQuery(
    term ? getArticlesSearchResults : getArticlesCategoryResults,
    variables,
    {
      onPreFetch: () => !isPreRendered,
      onFetch: formatData,
      onNoFetch: () => formatData(results),
      useCache: false,
    }
  )

  const totalResults = get(data, 'aggregate.aggregate.count')
  const rangeMin = totalResults > PAGE_SIZE ? offset + 1 : totalResults
  const rangeMax =
    totalResults > PAGE_SIZE
      ? Math.min(offset + PAGE_SIZE, totalResults)
      : totalResults

  useEffect(() => {
    if (!isPreRendered) {
      setCurrentPage(1)
    }
  }, [isPreRendered, term])

  const handleTaxonomyFilter = (id, active) => {
    setTouched(true)
    setCurrentPage(1)
    setTaxonomyIds(taxonomyIds =>
      active ? [...taxonomyIds, id] : taxonomyIds.filter(item => item !== id)
    )
  }

  const taxonomyKey = taxonomy || get(data, 'taxonomy.key')

  const handlePagination = dir => {
    if (isPreRendered) {
      navigate(
        `/section/${taxonomyKey}${
          currentPage + dir !== 1 ? `/page/${currentPage + dir}` : ''
        }`
      )
    } else {
      setCurrentPage(page => page + dir)
    }
  }

  const section = getTaxonomyItemByKey(taxonomyTypes, taxonomyKey)
  const sectionName = get(section, 'name', '')

  return (
    <PaddedContainer>
      <SEO
        title={term ? `Search Results - ${term}` : `${sectionName} Section`}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.pageHeader}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={9}>
              <Typography variant="h4" color="secondary">
                {term
                  ? 'SEARCH RESULTS FOR'
                  : get(data, 'taxonomy[0].taxonomy_type.name')}
              </Typography>
              <Typography variant="h1">
                {term ? <span>&lsquo;{term}&rsquo;</span> : sectionName}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.resultCount}>
                Showing {rangeMin} - {rangeMax} of {totalResults} results
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Taxonomies
                taxonomyIds={taxonomyIds}
                showAll={true}
                callback={handleTaxonomyFilter}
              />
            </Grid>
            <Grid item xs={9}>
              {data.articles.map(article => (
                <ArticleSummary
                  article={article}
                  bookmarked={userBookmarks.includes(article.id)}
                  bookmarkButtonDisabled={loadingBookmarks}
                  onBookmarkToggle={fetchUserBookmarks}
                  key={`article-${article.id}`}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center" justify="flex-end">
            {offset > 0 ? (
              <Button
                variant="contained"
                color="default"
                onClick={() => handlePagination(-1)}
                className={classes.prevButton}
              >
                Previous Page
              </Button>
            ) : null}
            {totalResults > offset + PAGE_SIZE ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handlePagination(1)}
              >
                Next Page
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </PaddedContainer>
  )
}

export default withStyles(theme => ({
  pageHeader: {
    borderBottom: `1px solid ${theme.palette.tertiary.light}`,
    '& h1': {
      fontSize: '28px',
      fontWeight: '900',
      lineHeight: '1.29',
      letterSpacing: '0.51px',
      color: theme.palette.text.primary,
      margin: '2px 4px',
    },
    '& p': {
      fontSize: '18px',
      fontWeight: 'bold',
      letterSpacing: '-0.13px',
      color: theme.palette.primary.main,
    },
  },
  prevButton: {
    backgroundColor: 'white',
    color: theme.palette.secondary.main,
    marginRight: '15px',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  resultCount: {
    paddingRight: '1px', // Due to the font this was looking mis-aligned
    textAlign: 'right',
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))(ListContent)
