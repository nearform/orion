import { useContext, useEffect } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { AuthContext } from './AuthWrapper'

/**
 * Execute a query which requires an authorization context to succeed.
 * @param query     The graphql query to execute.
 * @param variables Optional query parameters.
 * @param deps      A list of scope dependencies (see 2nd argument to useEffect).
 * @param onLoad    Optional function for processing the query result.
 */
export default function useAuthorizedQuery(
  query,
  variables,
  deps,
  onLoad = data => data
) {
  // Check if authorization context is initialized.
  const { isAuthInitialized } = useContext(AuthContext)

  // Setup query.
  const [fetchQuery, { data, loading, error }] = useManualQuery(query, {
    variables,
  })

  // Setup page effect.
  useEffect(() => {
    // TODO: Will a reload happen when params change? (check useManualQuery)
    // Check whether to initiate a query fetch.
    if (isAuthInitialized && !(data || loading || error)) {
      fetchQuery()
    }
  }, [isAuthInitialized, ...deps])

  // If data then generate result by calling onLoad handler.
  const result = data ? onLoad(data) : null

  // Return result.
  return [result, loading, error]
}
