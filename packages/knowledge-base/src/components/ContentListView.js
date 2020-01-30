import React, { useEffect, useMemo, useState } from 'react'
import { navigate } from 'gatsby'
import {
  withStyles,
  Grid,
  Typography,
  Button,
  useMediaQuery,
} from '@material-ui/core'
import get from 'lodash/get'

import { useAuthorizedQuery, PaddedContainer } from 'components'

import useTaxonomies from '../hooks/useTaxonomies'
import useUserBookmarks from '../hooks/useUserBookmarks'
import {
  getArticlesSearchResults,
  getArticlesCategoryResults,
} from '../queries'
import { getTaxonomyItemByKey, buildWhereClause } from '../utils/taxonomy'
import Seo from './Seo'
import Taxonomies from './content/Taxonomies'
import ArticleSummary from './content/ArticleSummary'
import CondensedArticleSummary from './content/CondensedArticleSummary'

const PAGE_SIZE = 10

const defaultAggregate = { aggregate: { count: 0 } }

const formatData = data => {
  return {
    articles:
      get(data, 'article') ||
      get(data, 'search_article') ||
      get(data, 'user_bookmarks', []).map(
        bookmark => bookmark.bookmarked_article
      ) ||
      [],
    aggregate:
      get(data, 'article_aggregate') ||
      get(data, 'search_article_aggregate') || {
        aggregate: { count: get(data, 'user_bookmarks', []).length },
      } ||
      defaultAggregate,
    taxonomy: get(data, 'taxonomy'),
  }
}

const BookmarkListView = ({ term, taxonomy, page = 1, results }) => {
  const taxonomyTypes = useTaxonomies()
  const [taxonomyIds, setTaxonomyIds] = useState([])
  const [touched, setTouched] = useState(false)
  const [currentPage, setCurrentPage] = useState(page)
  const offset = (currentPage - 1) * PAGE_SIZE
  const { userBookmarks } = useUserBookmarks(true)
  const data = formatData(userBookmarks)
  return (
    <StyledListContent
      term={term}
      taxonomy={taxonomy}
      page={page}
      results={results}
      data={data}
      taxonomyTypes={taxonomyTypes}
      taxonomyIds={taxonomyIds}
      setTaxonomyIds={setTaxonomyIds}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      offset={offset}
      touched={touched}
      setTouched={setTouched}
    />
  )
}

const ArticleListView = ({ term, taxonomy, page, results }) => {
  const taxonomyTypes = useTaxonomies()
  const [touched, setTouched] = useState(false)
  const [currentPage, setCurrentPage] = useState(page)
  const offset = (currentPage - 1) * PAGE_SIZE
  const taxonomyKey = taxonomy || get(results, 'taxonomy.key')
  const [taxonomyIds, setTaxonomyIds] = useState([get(results, 'taxonomy.id')])

  const variables = useMemo(
    () => ({
      whereClause: buildWhereClause(taxonomy, taxonomyIds, taxonomyTypes),
      limit: PAGE_SIZE,
      offset,
      taxonomyKey,
      ...(term && { contentLike: term }),
    }),
    [taxonomy, taxonomyIds, taxonomyTypes, offset, term, taxonomyKey]
  )
  const { data } = useAuthorizedQuery(
    term ? getArticlesSearchResults : getArticlesCategoryResults,
    variables,
    {
      onFetch: formatData,
      onNoFetch: () => formatData(results),
      useCache: false,
    }
  )
  return (
    <StyledListContent
      term={term}
      taxonomy={taxonomy}
      page={page}
      results={results}
      data={data}
      taxonomyTypes={taxonomyTypes}
      taxonomyIds={taxonomyIds}
      setTaxonomyIds={setTaxonomyIds}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      offset={offset}
      touched={touched}
      setTouched={setTouched}
    />
  )
}

const ListContent = ({
  classes,
  term,
  taxonomy,
  results,
  data,
  taxonomyTypes,
  taxonomyIds,
  setTaxonomyIds,
  currentPage,
  setCurrentPage,
  offset,
  touched,
  setTouched,
}) => {
  const {
    fetchUserBookmarks,
    userBookmarks,
    loadingBookmarks,
  } = useUserBookmarks()
  const isSmUp = useMediaQuery('(min-width:600px)')
  const taxonomyKey = taxonomy || get(results, 'taxonomy.key')
  const isPreRendered = !(touched || term || taxonomy)
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
  }, [isPreRendered, term, setCurrentPage])
  const handleTaxonomyFilter = (id, active) => {
    setTouched(true)
    setCurrentPage(1)
    setTaxonomyIds(taxonomyIds =>
      active ? [...taxonomyIds, id] : taxonomyIds.filter(item => item !== id)
    )
  }

  const handlePagination = dir => {
    if (isPreRendered) {
      navigate(
        `/section/${taxonomyKey}${
          currentPage + dir === 1 ? '' : `/page/${currentPage + dir}`
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
      <Seo
        title={term ? `Search Results - ${term}` : `${sectionName} Section`}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.pageHeader}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={9} className={classes.headerGrid}>
              <Typography variant="h4" color="secondary">
                {term
                  ? 'SEARCH RESULTS FOR'
                  : get(data, 'taxonomy[0].taxonomy_type.name', '\u00A0')}
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
            <Grid item xs={3}>
              {isSmUp && (
                <Taxonomies
                  showAll
                  taxonomyIds={taxonomyIds}
                  callback={handleTaxonomyFilter}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={9}>
              {data.articles.map(article =>
                isSmUp ? (
                  <ArticleSummary
                    key={`article-${article.id}`}
                    article={article}
                    bookmarked={userBookmarks.includes(article.id)}
                    bookmarkButtonDisabled={loadingBookmarks}
                    onBookmarkToggle={fetchUserBookmarks}
                  />
                ) : (
                  <CondensedArticleSummary
                    key={`article-${article.id}`}
                    article={article}
                    bookmarked={userBookmarks.includes(article.id)}
                    bookmarkButtonDisabled={loadingBookmarks}
                    filterText={term ? term : sectionName}
                    onBookmarkToggle={fetchUserBookmarks}
                  />
                )
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center" justify="flex-end">
            {offset > 0 ? (
              <Button
                variant="contained"
                color="default"
                className={classes.prevButton}
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
    </PaddedContainer>
  )
}

const StyledListContent = withStyles(theme => ({
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
  term: {
    marginLeft: '0 !important', // Needed to properly align with subheading
  },
  headerGrid: {
    // PaddingTop: `${theme.spacing(30)} !important`,
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

const ContentListView = ({ term, taxonomy, page = 1, results }) => {
  const taxonomyKey = taxonomy || get(results, 'taxonomy.key')
  return taxonomyKey === 'my_bookmarks' ? (
    <BookmarkListView
      term={term}
      taxonomy={taxonomy}
      page={page}
      results={results}
    />
  ) : (
    <ArticleListView
      term={term}
      taxonomy={taxonomy}
      page={page}
      results={results}
    />
  )
}

export default ContentListView
