import { useState } from 'react'

import { useQuery } from 'graphql-hooks'

const useTable = ({ query, variables }) => {
  const pageSizes = [10, 20, 50]

  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const [orderBy, setOrderBy] = useState({ created_at: 'desc' })

  // const setPage = pageNumber => {
  //   setOffset(Math.max(0, pageSize * (pageNumber - 1)))
  // }

  let { loading, error, data, refetch } = useQuery(query, {
    variables: {
      ...variables,
      offset,
      limit: pageSize,
      orderBy,
    },
  })

  return {
    data,
    loading,
    error,
    refetch,
    tableProps: {
      data,
      offset,
      setOffset,
      pageSize,
      setPageSize,
      orderBy,
      setOrderBy,
      pageSizes,
    },
  }
}

export default useTable
