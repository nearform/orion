import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getArticlesSearchResults } from '../../queries'
import { withStyles, Grid, Typography, Button } from '@material-ui/core'
import SEO from '../SEO'
import Taxonomies from './Taxonomies'
import ArticleSummary from './ArticleSummary'

const extractArticleData = data => {
  const summaries = []
  const taxonomyItems = []
  data.search_article.map(item => {
    summaries.push(
      <ArticleSummary key={'article_id_' + item.id} article={item} />
    )
    taxonomyItems.push(...item.taxonomy_items)
  })
  return { taxonomyItems, summaries }
}

const buildWhereClause = taxonomies => {
  const clause = {
    status: { _in: ['in-review', 'published'] },
  }
  if (taxonomies.length >= 1) {
    clause.taxonomy_items = { taxonomy_id: { _in: taxonomies } }
  }

  return clause
}

const SearchResults = ({ classes, term }) => {
  const taxonomies = []
  const { data: articleData } = useQuery(getArticlesSearchResults, {
    variables: {
      titleLike: term,
      limit: 10,
      offset: 0,
      whereClause: buildWhereClause(taxonomies),
    },
  })

  //TODO: nicer loading indication
  if (!articleData) return null

  const { taxonomyItems, summaries } = extractArticleData(articleData)
  const totalArticles = articleData.search_article_aggregate.aggregate.count
  const range = totalArticles >= 10 ? 10 : totalArticles

  return (
    <>
      <SEO title={`Search Results - ${term}`} />
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.pageHeader}>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={9}>
              <Typography variant="h4" color="secondary">
                SEARCH RESULTS FOR
              </Typography>
              <Typography variant="h1">&lsquo;{term}&rsquo;</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                Showing 1-{range}, of{' '}
                {articleData.search_article_aggregate.aggregate.count} results
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.taxonomyWrapper}>
          <Taxonomies items={taxonomyItems} showAll={true} />
        </Grid>
        <Grid item xs={8}>
          {summaries}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={7}></Grid>
            <Grid item xs={4}>
              <Button variant="contained" className={classes.PrevButton}>
                Previous Page
              </Button>
              <Button variant="contained" className={classes.NextButton}>
                Next Page
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(theme => ({
  pageHeader: {
    borderBottom: `1px solid ${theme.palette.tertiary.light}`,
    margin: theme.spacing(3),
    '& h1': {
      fontSize: '28px',
      fontWeight: '900',
      lineHeight: '1.29',
      letterSpacing: '0.51px',
      color: '#2e2e2e',
      margin: '2px 4px',
    },
    '& p': {
      fontSize: '18px',
      fontWeight: 'bold',
      letterSpacing: '-0.13px',
      color: theme.palette.primary.main,
    },
  },
  taxonomyWrapper: {
    marginLeft: theme.spacing(3),
  },
  PrevButton: {
    backgroundColor: 'white',
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  NextButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    marginLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))(SearchResults)
