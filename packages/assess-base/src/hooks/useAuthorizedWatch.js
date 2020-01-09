import { useEffect, useState } from 'react'
import { useAuthorizedQuery } from 'components'

/**
 * Execute a query which requires an authorization context to succeed.
 * Many data queries will fail due to data access permission errors if executed
 * without
 *
 * @param query     The graphql query to execute.
 * @param variables Optional query parameters.
 * @param opts      Hook options; includes:
 *                  onPreFetch: A function called before the query is fetched;
 *                  passed the set of query variables, returns true if the query
 *                  should be fetched.
 *                  onFetch: A function called after the query is fetched;
 *                  passed the query data, returns the query result.
 *                  onNoFetch: A function called when no data is available; can
 *                  be used to return a default data result.
 *                  useCache: A flag indicating whether to use the query cache.
 *                  pollingPeriodMs: Number of ms between refreshes of the query.
 */
export default function useAuthorizedWatch(query, variables, opts = {}) {
  // Store the timestamp of the when the last polling was requested.
  const [fetchedTimestamp, setFetchedTimestamp] = useState(Date.now())
  const result = useAuthorizedQuery(query, variables, opts)

  const { pollingPeriodMs = 1000 } = opts

  useEffect(() => {
    let id = setTimeout(refetchIfIdle, pollingPeriodMs)

    async function refetchIfIdle() {
      // Don't let requests queue. Reschedule the update if there is a pending request (possible on slow connections).
      if (result.loading) {
        id = setTimeout(refetchIfIdle, pollingPeriodMs)
        return
      }

      const currentTimestamp = Date.now()
      await result.refetch()
      setFetchedTimestamp(currentTimestamp)
    }

    return () => clearTimeout(id)
  })

  // Return result.
  return {
    ...result,
    fetchedTimestamp,
  }
}
