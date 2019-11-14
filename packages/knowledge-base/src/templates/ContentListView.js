import React, { useEffect, useMemo, useState } from 'react'
import { navigate } from 'gatsby'
import { withStyles, Grid, Typography, Button, Hidden } from '@material-ui/core'
import get from 'lodash/get'
import Taxonomies from '../components/content/Taxonomies'
import ArticleSummary from '../components/content/ArticleSummary'
import CondensedArticleSummary from '../components/content/CondensedArticleSummary'
import useTaxonomies from '../hooks/useTaxonomies'
import useUserBookmarks from '../hooks/useUserBookmarks'
import {
  getArticlesSearchResults,
  getArticlesCategoryResults,
} from '../queries'
import { getTaxonomyItemByKey, buildWhereClause } from '../utils/taxonomy'
import { useAuthorizedQuery, PaddedContainer } from 'components'
import SEO from '../components/SEO'

const PAGE_SIZE = 10
const defaultAggregate = { aggregate: { count: 0 } }

const ListContent = ({ classes, term, taxonomy, pageContext }) => {
  const {
    fetchUserBookmarks,
    userBookmarks,
    loadingBookmarks,
  } = useUserBookmarks()

  const taxonomyTypes = useTaxonomies()
  const [taxonomyIds, setTaxonomyIds] = useState([])
  const [touched, setTouched] = useState(false)

  const [page, setPage] = useState(get(pageContext, 'page', 1))
  const offset = (page - 1) * PAGE_SIZE

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
      onNoFetch: () => formatData(get(pageContext, 'results')),
      useCache: false,
    }
  )

  const totalResults = get(data, 'aggregate.aggregate.count')
  const rangeMin = totalResults > PAGE_SIZE ? offset + 1 : totalResults
  const rangeMax =
    totalResults > PAGE_SIZE
      ? Math.min(offset + PAGE_SIZE, totalResults)
      : totalResults

  const isPreRendered = !(touched || term || taxonomy)

  useEffect(() => {
    if (!isPreRendered) {
      setPage(1)
    }
  }, [isPreRendered, term])

  const handleTaxonomyFilter = (id, active) => {
    setTouched(true)
    setPage(1)
    setTaxonomyIds(taxonomyIds =>
      active ? [...taxonomyIds, id] : taxonomyIds.filter(item => item !== id)
    )
  }

  const taxonomyKey = taxonomy || get(data, 'taxonomy.key')

  const handlePagination = dir => {
    if (isPreRendered) {
      navigate(
        `/section/${taxonomyKey}${
          page + dir !== 1 ? `/page/${page + dir}` : ''
        }`
      )
    } else {
      setPage(page => page + dir)
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
            <Grid item xs={12} sm={9} className={classes.headerGrid}>
              <Typography variant="h4" color="secondary">
                {term
                  ? 'SEARCH RESULTS FOR'
                  : get(data, 'taxonomy[0].taxonomy_type.name')}
              </Typography>
              <Typography variant="h1" className={classes.term}>
                {term ? <span>&lsquo;{term}&rsquo;</span> : sectionName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} className={classes.mobileSpacing}>
              <Typography className={classes.resultCount}>
                Showing {rangeMin} - {rangeMax} of {totalResults} results
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Hidden xsDown>
              <Grid item xs={3}>
                <Taxonomies
                  taxonomyIds={taxonomyIds}
                  showAll={true}
                  callback={handleTaxonomyFilter}
                />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={9}>
              {data.articles.map(article => (
                <React.Fragment key={`article-${article.id}`}>
                  <Hidden xsDown>
                    <ArticleSummary
                      article={article}
                      bookmarked={userBookmarks.includes(article.id)}
                      bookmarkButtonDisabled={loadingBookmarks}
                      onBookmarkToggle={fetchUserBookmarks}
                    />
                  </Hidden>
                  <Hidden smUp>
                    <CondensedArticleSummary
                      article={article}
                      bookmarked={userBookmarks.includes(article.id)}
                      bookmarkButtonDisabled={loadingBookmarks}
                      onBookmarkToggle={fetchUserBookmarks}
                      filterText={term ? term : sectionName}
                    />
                  </Hidden>
                </React.Fragment>
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
  term: {
    marginLeft: '0 !important', // needed to properly align with subheading
  },
  headerGrid: {
    // paddingTop: `${theme.spacing(30)} !important`,
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '0 !important',
      marginTop: theme.spacing(2),
    },
  },
  mobileSpacing: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0 !important',
      paddingBottom: '0 !important',
    },
  },
  resultCount: {
    paddingRight: '1px', // Due to the font this was looking misaligned
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      marginBottom: theme.spacing(1),
    },
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))(ListContent)
