import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Button, Grid, Typography, Paper, withStyles } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import { Link } from '@reach/router'
import { useManualQuery } from 'graphql-hooks'

import baseQuery from '../../queries/base-search.graphql'
import useDebounce from '../../hooks/useDebounce'

function SearchInput({
  classes,
  onSearch,
  placeholderText,
  query = baseQuery,
}) {
  const [state, setState] = useState({
    term: '',
    searched: false,
    focused: false,
    results: [],
  })
  const [queryFn, queryResult] = useManualQuery(query)
  const debouncedSearchTerm = useDebounce(state.term, 500)

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 0) {
      queryFn({
        variables: {
          term: `%${debouncedSearchTerm}%`,
          limit: 4,
        },
      })
    } else {
      setState(s => ({
        ...s,
        results: [],
      }))
    }
  }, [debouncedSearchTerm, queryFn])

  useEffect(() => {
    if (queryResult.data) {
      setState(s => ({
        ...s,
        searched: true,
        results: queryResult.data.results,
      }))
    }
  }, [queryResult.data])

  const { focused, searched, term, results } = state

  const cls =
    results.length > 0 && focused
      ? 'results visible'
      : focused && searched
      ? 'no-results visible'
      : 'results'

  return (
    <div className={focused ? `${classes.root} focused` : classes.root}>
      <input
        className={classes.input}
        placeholder={placeholderText}
        value={term}
        onFocus={() => setState({ ...state, focused: true })}
        onBlur={() => setState({ ...state, focused: false })}
        onChange={event => setState({ ...state, term: event.target.value })}
      />
      <Button className={classes.button} onClick={() => onSearch(term)}>
        <Search />
      </Button>
      <Paper elevation={3} className={cls}>
        <Grid container>
          {state.results.length > 0 && (
            <Grid item xs={12}>
              <Typography className="results-label" variant="h5">
                Top Hits
              </Typography>
            </Grid>
          )}
          {state.results.length > 0 &&
            state.results.map(result => (
              <Grid key={result.id} item xs={12}>
                <Typography component={Link} to={result.path} variant="h5">
                  {result.title}
                </Typography>
              </Grid>
            ))}
          {state.results && state.results.length > 0 && (
            <Grid item xs={12}>
              <Typography
                component={Link}
                to={`/search?term=${state.term}`}
                variant="h5"
              >
                More results
              </Typography>
            </Grid>
          )}
          {state.results.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="h5">No Results</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  )
}

const styles = theme => ({ ...theme.searchInput })

SearchInput.propTypes = {
  classes: T.object,
  onSearch: T.func,
  placeholderText: T.string,
  query: T.string,
}

SearchInput.defaultProps = {
  placeholderText: 'Search',
  onSearch: () => undefined,
  classes: {},
  query: undefined,
}

SearchInput.defaultProps = {
  classes: undefined,
  onSearch: undefined,
}

export default withStyles(styles, { withTheme: true })(SearchInput)
