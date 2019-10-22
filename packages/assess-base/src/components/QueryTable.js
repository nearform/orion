import React, { useState } from 'react'
import T from 'prop-types'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Tooltip,
  TableSortLabel,
  Typography,
  Paper,
} from '@material-ui/core'
import { useQuery } from 'graphql-hooks'

function QueryTable({
  headers,
  pageSizes = [10, 20, 50],
  renderTableBody,
  orderBy: orderByProp = { id: 'asc' },
  query,
  variables,
  testid,
}) {
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const [orderBy, setOrderBy] = useState(orderByProp)

  const { loading, error, data } = useQuery(query, {
    variables: {
      ...variables,
      offset,
      limit: pageSize,
      orderBy,
    },
  })

  if (!headers.length) return <Typography>No table headers to show</Typography>

  if (loading) return <Typography>Loading...</Typography>

  if (error) return <Typography>Error loading data.</Typography>

  return (
    <Paper data-testid={testid}>
      {data && (
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(({ id, sortable, cellProps, label }) => {
                if (!sortable) {
                  return (
                    <TableCell key={id} {...cellProps}>
                      {label}
                    </TableCell>
                  )
                }
                const columnIsOrdered = orderBy.hasOwnProperty(id)
                return (
                  <TableCell
                    key={id}
                    sortDirection={columnIsOrdered ? orderBy[id] : false}
                    {...cellProps}
                  >
                    <Tooltip title="Sort" enterDelay={300}>
                      <TableSortLabel
                        active={columnIsOrdered}
                        direction={orderBy[id]}
                        onClick={() =>
                          setOrderBy({
                            [id]: orderBy[id] === 'asc' ? 'desc' : 'asc',
                          })
                        }
                      >
                        {label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody(data)}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={pageSizes}
                colSpan={headers.length}
                count={data.field_aggregate.aggregate.count}
                rowsPerPage={pageSize}
                page={Math.floor(offset / pageSize)}
                onChangePage={(event, page) => setOffset(page * pageSize)}
                onChangeRowsPerPage={event => setPageSize(event.target.value)}
              />
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </Paper>
  )
}

QueryTable.propTypes = {
  headers: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      label: T.string.isRequired,
      sortable: T.bool,
      cellProps: T.object,
    })
  ).isRequired,
  pageSizes: T.arrayOf(T.number),
  renderTableBody: T.func.isRequired,
  testid: T.string,
}

export default QueryTable
