import React, { useState } from 'react'
import ContentListResults from './ContentListResults'
import Taxonomies from './Taxonomies'
import usePrevious from '../../hooks/usePrevious'
import useTaxonomies from '../../hooks/useTaxonomies'
import { useIsAuthInitialized } from '../../utils/auth'
import { getTaxonomyItemByKey } from '../../utils/taxonomy'
import { withStyles, Grid, Typography, Button } from '@material-ui/core'
import SEO from '../SEO'

const ListContent = ({ classes, term, cat }) => {
  const t = term || cat
  const [searchTerm, setSearchTerm] = useState(t)
  const prevTerm = usePrevious(searchTerm)
  const [totalResults, setTotalResults] = useState(0)
  const [range, setRange] = useState(0)
  const [taxonomyIds, setTaxonomyIds] = useState([])
  const [offset, setOffset] = useState(0)
  const taxonomyTypes = useTaxonomies()
  // isAuthInitialized prevents occurance of JWT authentication bug
  const isAuthInitialized = useIsAuthInitialized()
  if (!isAuthInitialized) return null
  const handleContentData = ({ taxonomyIds, totalResults, range }) => {
    setTotalResults(totalResults)
    setRange(range)
    if (t !== prevTerm) {
      setSearchTerm(t)
      setTaxonomyIds(taxonomyIds)
    }
  }
  const handleTaxonomyFilter = taxonomyIds => {
    setTaxonomyIds(taxonomyIds)
  }
  const handlePagination = dir => {
    setOffset(offset + 10 * dir)
  }
  const section = getTaxonomyItemByKey(taxonomyTypes, cat)

  return (
    <>
      <SEO
        title={term ? `Search Results - ${term}` : `${section.name} Section`}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.pageHeader}>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={9}>
              <Typography variant="h4" color="secondary">
                {term ? 'SEARCH RESULTS FOR' : section.type}
              </Typography>
              <Typography variant="h1">
                &lsquo;{term ? term : section.name}&rsquo;
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                Showing {totalResults > 0 ? '1 -' : ''} {range}, of{' '}
                {totalResults} results
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.taxonomyWrapper}>
          <Taxonomies
            taxonomyIds={taxonomyIds}
            showAll={true}
            callback={handleTaxonomyFilter}
          />
        </Grid>
        <ContentListResults
          term={term}
          cat={cat}
          taxonomy={taxonomyIds}
          callback={handleContentData}
          offset={offset}
        />
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={7}></Grid>
            <Grid item xs={4}>
              {offset > 0 ? (
                <Button
                  variant="contained"
                  className={classes.PrevButton}
                  onClick={() => handlePagination(-1)}
                >
                  Previous Page
                </Button>
              ) : null}
              {totalResults > offset + 10 ? (
                <Button
                  variant="contained"
                  className={classes.NextButton}
                  onClick={() => handlePagination(1)}
                >
                  Next Page
                </Button>
              ) : null}
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
  taxonomyWrapper: {
    marginLeft: theme.spacing(3),
  },
  PrevButton: {
    backgroundColor: 'theme.palette.background.paper',
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
}))(ListContent)
