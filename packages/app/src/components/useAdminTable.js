import React, { useState } from 'react'
import T from 'prop-types'

import AdminTable from './AdminTable'
import { useQuery } from 'graphql-hooks'

export default function useAdminTable({
  query,
  headers,
  variables,
  renderTableBody,
}) {
  const pageSizes = [10, 20, 50]

  function setPage(pageNumber) {
    setOffset(Math.max(0, pageSize * (pageNumber - 1)))
  }

  const [selected, setSelected] = useState(null)
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const [orderBy, setOrderBy] = useState({
    id: 'asc',
  })

  const { loading, error, data, refetch } = useQuery(query, {
    variables: {
      ...variables,
      offset,
      limit: pageSize,
      orderBy,
    },
  })

  const loadingMsg = loading && 'Loading table...'
  const errorMsg = error && 'Error loading table.'

  const table = !loading && !error && (
    <AdminTable
      headers={headers}
      data={data}
      offset={offset}
      pageSize={pageSize}
      orderBy={orderBy}
      setPageSize={setPageSize}
      setOrderBy={setOrderBy}
      setOffset={setOffset}
      pageSizes={pageSizes}
    >
      {renderTableBody(data, { selected, setSelected, refetch })}
    </AdminTable>
  )

  return {
    selected,
    setSelected,
    page: offset / pageSize + 1,
    setPage,
    refetch,
    table: loadingMsg || errorMsg || table,
  }
}

useAdminTable.defaultProps = {
  variables: {},
}

useAdminTable.propTypes = {
  headers: T.array,
  query: T.string,
  variables: T.object,
}
