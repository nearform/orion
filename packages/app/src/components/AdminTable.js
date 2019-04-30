import React, { useState } from 'react'
import { useQuery } from 'graphql-hooks'
import T from 'prop-types'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Typography,
  TablePagination,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core'

export default function AdminTable({
  query,
  variables,
  pageTitle,
  headers,
  AdminTableContent,
  Modal,
}) {
  const PAGE_SIZES = [4, 8, 12]
  const [selected, setSelected] = useState(null)
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
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

  const changePage = (event, page) => {
    setOffset(page * pageSize)
  }

  const handleChangePageSize = event => setPageSize(event.target.value)

  const toggleOrder = order => (order === 'asc' ? 'desc' : 'asc')

  const handleSort = property =>
    setOrderBy({ [property]: toggleOrder(orderBy[property]) })

  if (!headers.length) return 'No table headers to show'

  if (loading) return 'Loading...'
  if (error) return 'Error!'

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {pageTitle}
      </Typography>
      {Modal && (
        <Modal
          selected={selected}
          onClose={() => setSelected(null)}
          onApply={() => {
            refetch()
            setSelected(null)
          }}
        />
      )}
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => {
              if (!header.sortable)
                return <TableCell key={header.id}>{header.label}</TableCell>
              return (
                <TableCell
                  key={header.id}
                  sortDirection={
                    orderBy.hasOwnProperty(header.id) ? header.id : false
                  }
                >
                  <Tooltip title="Sort" enterDelay={300}>
                    <TableSortLabel
                      active={orderBy.hasOwnProperty(header.id)}
                      direction={orderBy[header.id]}
                      onClick={e => handleSort(header.id)}
                    >
                      {header.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <AdminTableContent data={data} setSelected={setSelected} />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={PAGE_SIZES}
              colSpan={headers.length}
              count={data.field_aggregate.aggregate.count}
              rowsPerPage={pageSize}
              page={Math.floor(offset / pageSize)}
              onChangePage={changePage}
              onChangeRowsPerPage={handleChangePageSize}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}

AdminTable.defaultProps = {
  variables: {},
}

AdminTable.propTypes = {
  query: T.string,
  variables: T.object,
  pageTitle: T.oneOfType([T.string, T.node]),
  headers: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      label: T.string.isRequired,
      sortable: T.bool,
    })
  ).isRequired,
  AdminTableContent: T.func.isRequired,
  Modal: T.func,
}
