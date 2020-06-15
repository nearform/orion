import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import { Button, Grid, Typography, Paper, makeStyles } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import { Link, navigate } from '@reach/router'
import { useManualQuery } from 'graphql-hooks'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { debounce } from 'lodash'

import baseQuery from '../../queries/base-search.graphql'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'fixed',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      transition: 'all 0.2s ease',
    },
    '&.focused': {
      '&& input': {
        position: 'relative',
        zIndex: 1,
        transform: 'scale(1.03)',
        transition: 'all 0.2s ease',
      },
      '&& button': {
        transform: 'scale(1.03)',
        transition: 'all 0.2s ease',
      },
      '&:before': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
      },
      '&& .results.visible': {
        maxHeight: 240,
        transition: 'all 0.2s ease 0.2s',
      },
      '&& .no-results.visible': {
        maxHeight: 60,
        transition: 'all 0.2s ease 0.2s',
      },
    },
    '& .results': {
      position: 'absolute',
      left: -4,
      right: 0,
      top: 40,
      background: theme.palette.background.paper,
      width: 'calc(100% + 4px)',
      transition: 'all 0.2s ease',
      maxHeight: 0,
      overflow: 'hidden',
      zIndex: 1,
      '& .MuiTypography-h5': {
        padding: '12px 8px',
        display: 'block',
        textDecoration: 'none',
        color: theme.palette.secondary.main,
      },
      '& .MuiTypography-h5.results-label': {
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.tertiary.main,
        borderBottomStyle: 'solid',
        color: theme.palette.tertiary.main,
        margin: '0 0 4px 8px',
        width: 'calc(100% - 32px)',
        padding: '4px 0 8px',
      },
    },
    '& .no-results': {
      position: 'absolute',
      left: -4,
      right: 0,
      top: 40,
      background: theme.palette.background.paper,
      width: 'calc(100% + 4px)',
      transition: 'all 0.2s ease',
      maxHeight: 0,
      overflow: 'hidden',
      zIndex: 1,
      '& .MuiTypography-h5': {
        padding: '12px 8px',
        display: 'block',
        textDecoration: 'none',
      },
    },
  },
  input: {
    ...theme.typography.h6,
    backgroundColor: theme.palette.background.dark,
    border: '1px solid',
    borderColor: theme.palette.tertiary.main,
    borderBottomLeftRadius: 4,
    borderRight: 0,
    borderTopLeftRadius: 4,
    flex: 1,
    padding: 8,
    outline: 0,
    paddingLeft: 12,
    transition: 'all 0.2s ease 0.2s',
    '&::placeholder': {
      ...theme.typography.h6,
    },
  },
  button: {
    backgroundColor: theme.palette.action.main,
    border: 'none',
    borderRadius: 4,
    borderBottomLeftRadius: 0,
    borderLeft: 0,
    borderTopLeftRadius: 0,
    boxShadow: 'none',
    color: theme.palette.background.default,
    height: '100%',
    padding: 4,
    minWidth: 40,
    minHeight: 40,
    transition: 'all 0.2s ease 0.2s',
    zIndex: 2,
    '&:hover': {
      backgroundColor: fade(theme.palette.action.main, 0.8),
    },
  },
}))

function SearchInput({ placeholderText, query }) {
  const classes = useStyles()
  const [state, setState] = useState({
    term: '',
    searched: false,
    focused: false,
    results: [],
  })
  const [queryFn, queryResult] = useManualQuery(query)
  const debouncedSearchTerm = debounce(state.term, 500)
  const searchInput = useRef(null)

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 0) {
      queryFn({
        variables: {
          term: `%${debouncedSearchTerm}%`,
          limit: 4,
          isFullSearch: false,
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
    <form
      className={focused ? `${classes.root} focused` : classes.root}
      onSubmit={event => {
        event.preventDefault()
        searchInput.current.blur()
        navigate(`/search?term=${state.term}`)
      }}
    >
      <input
        ref={searchInput}
        className={classes.input}
        placeholder={placeholderText}
        value={term}
        onFocus={() => setState({ ...state, focused: true })}
        onBlur={() => setState({ ...state, focused: false })}
        onChange={event => setState({ ...state, term: event.target.value })}
      />
      <Button className={classes.button} type="submit">
        <Search />
      </Button>
      <Paper elevation={3} className={cls}>
        <Grid container>
          {state.results.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography className="results-label" variant="h5">
                  Top Hits
                </Typography>
              </Grid>
              {state.results.map(result => (
                <Grid key={result.id} item xs={12}>
                  <Typography component={Link} to={result.path} variant="h5">
                    {result.title}
                  </Typography>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography
                  component={Link}
                  to={`/search?term=${state.term}`}
                  variant="h5"
                >
                  More results
                </Typography>
              </Grid>
            </>
          )}
          {state.results.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="h5">No Results</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </form>
  )
}

SearchInput.propTypes = {
  placeholderText: T.string,
  query: T.string,
}

SearchInput.defaultProps = {
  placeholderText: 'Search',
  query: baseQuery,
}

export default SearchInput
