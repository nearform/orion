import { useContext } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { AuthContext } from './AuthWrapper'

/**
 * Execute a query which requires an authorization context to succeed.
 * @param query     The graphql query to execute.
 * @param variables Optional query parameters.
 * @param opts      Hook options; includes:
 *                  onPreFetch: A function called before the query is fetched;
 *                  passed the set of query variables, returns true if the query
 *                  should be fetched.
 *                  onFetch: A function called after the query is fetched;
 *                  passed the query data, returns the query result.
 */
export default function useAuthorizedQuery(query, variables, opts = {}) {
  const { onPreFetch = variables => true, onFetch = data => data } = opts

  // Check if authorization context is initialized.
  const { isAuthInitialized } = useContext(AuthContext)

  // Setup query.
  const [_fetch, { data: _data, loading: _loading, error }] = useManualQuery(
    query,
    {
      variables,
    }
  )

  // Check whether fetch has been called yet.
  const isPreFetch = !(_data || _loading || error)

  // Do the initial fetch if (1) isPreFetch, (2) auth is initialized and (3)
  // onPreFetch says it's OK.
  if (isPreFetch && isAuthInitialized && onPreFetch(variables)) {
    _fetch()
  }

  // If data then generate result by calling onLoad handler.
  const data = _data ? onFetch(_data) : null

  // Set loading flag if prefetch of loading.
  const loading = isPreFetch || _loading

  // Function for refetching the query with new variables.
  function refetch(variables) {
    if (onPreFetch(variables)) {
      _fetch({ variables })
    }
  }

  // Return result.
  return { data, loading, error, refetch }
}
