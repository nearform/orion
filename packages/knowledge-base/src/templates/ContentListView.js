import React, { useState, useEffect, useMemo } from 'react'
import { navigate } from 'gatsby'
import { withStyles, Grid, Typography, Button } from '@material-ui/core'
import { useManualQuery } from 'graphql-hooks'
import get from 'lodash/get'
import SEO from '../components/SEO'
import Taxonomies from '../components/content/Taxonomies'
import ArticleSummary from '../components/content/ArticleSummary'
import useTaxonomies from '../hooks/useTaxonomies'
import {
  getArticlesSearchResults,
  getArticlesCategoryResults,
  getUserBookmarks,
} from '../queries'
import { useIsAuthInitialized, useUserId } from '../utils/auth'
import { getTaxonomyItemByKey, buildWhereClause } from '../utils/taxonomy'
import { PaddedContainer } from 'components'

const PAGE_SIZE = 10
const defaultAggregate = { aggregate: { count: 0 } }

const ListContent = ({
  classes,
  term,
  taxonomy,
  pageContext: { results: resultsFromContext, page: pageFromContext } = {},
}) => {
  const userId = useUserId()
  const isAuthInitialized = useIsAuthInitialized()

  const [
    fetchUserBookmarks,
    { data: bookmarksData, loading: fetchingBookmarks },
  ] = useManualQuery(getUserBookmarks, { variables: { userId } })
  const userBookmarks = get(bookmarksData, 'user_bookmarks', []).map(
    bookmark => bookmark.article_id
  )

  const [
    fetchArticlesByTaxonomy,
    { data: fetchedArticlesByTaxonomy },
  ] = useManualQuery(getArticlesCategoryResults)

  const [
    fetchArticlesByTitle,
    { data: fetchedArticlesByTitle },
  ] = useManualQuery(getArticlesSearchResults)

  const results =
    fetchedArticlesByTaxonomy || fetchedArticlesByTitle || resultsFromContext

  const data = {
    articles: get(results, 'article') || get(results, 'search_article') || [],
    aggregate:
      get(results, 'article_aggregate') ||
      get(results, 'search_article_aggregate') ||
      defaultAggregate,
    taxonomy:
      get(resultsFromContext, 'taxonomy') || taxonomy ? { key: taxonomy } : {},
  }

  const taxonomyTypes = useTaxonomies()
  const [taxonomyIds, setTaxonomyIds] = useState([])
  // TODO: uncomment below when SSR is enabled
  // const [touched, setTouched] = useState(false)

  const [page, setPage] = useState(pageFromContext || 1)
  const offset = (page - 1) * PAGE_SIZE
  const totalResults = get(data, 'aggregate.aggregate.count')
  const rangeMin = totalResults > PAGE_SIZE ? offset + 1 : totalResults
  const rangeMax =
    totalResults > PAGE_SIZE
      ? Math.min(offset + PAGE_SIZE, totalResults)
      : totalResults

  // TODO: uncomment below when SSR is enabled
  // const isPreRendered = !touched && !term
  // TODO: delete below when SSR is enabled
  const isPreRendered = false

  const fetchArticles = term ? fetchArticlesByTitle : fetchArticlesByTaxonomy
  const vars = useMemo(
    () => ({
      whereClause: buildWhereClause(
        data.taxonomy.key,
        taxonomyIds,
        taxonomyTypes
      ),
      limit: PAGE_SIZE,
      offset,
      ...(term && { titleLike: term }),
    }),
    [data.taxonomy.key, taxonomyIds, taxonomyTypes, offset, term]
  )

  useEffect(() => {
    if (!isPreRendered) {
      setPage(1)
    }
  }, [isPreRendered, term])

  useEffect(() => {
    if (isAuthInitialized && !isPreRendered) {
      fetchArticles({
        variables: vars,
        useCache: false,
      })
    }
  }, [isAuthInitialized, isPreRendered, fetchArticles, vars])

  useEffect(() => {
    if (isAuthInitialized && userId) {
      fetchUserBookmarks()
    }
  }, [isAuthInitialized, userId, fetchUserBookmarks])

  const handleTaxonomyFilter = (id, active) => {
    // TODO: uncomment below when SSR is enabled
    // setTouched(true)
    setPage(1)
    setTaxonomyIds(taxonomyIds =>
      active ? [...taxonomyIds, id] : taxonomyIds.filter(item => item !== id)
    )
  }

  const handlePagination = dir => {
    if (isPreRendered) {
      navigate(
        `/section/${data.taxonomy.key}${
          page + dir !== 1 ? `/page/${page + dir}` : ''
        }`
      )
    } else {
      setPage(page => page + dir)
    }
  }
  const section = getTaxonomyItemByKey(taxonomyTypes, data.taxonomy.key)

  return (
    <PaddedContainer>
      <SEO
        title={term ? `Search Results - ${term}` : `${section.name} Section`}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.pageHeader}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={9}>
              <Typography variant="h4" color="secondary">
                {term ? 'SEARCH RESULTS FOR' : section.type}
              </Typography>
              <Typography variant="h1">
                &lsquo;{term ? term : section.name}&rsquo;
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography style={{ textAlign: 'right' }}>
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
                  bookmarkButtonDisabled={fetchingBookmarks}
                  onBookmarkToggle={fetchUserBookmarks}
                  key={`article-${article.id}`}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={7}></Grid>
            <Grid item xs={4}>
              {offset > 0 ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handlePagination(-1)}
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
  PrevButton: {
    backgroundColor: 'theme.palette.background.paper',
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))(ListContent)
