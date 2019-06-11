import React, { useState } from 'react'
import T from 'prop-types'
import MuiTable from '@material-ui/core/Table'
import MuiTableHead from '@material-ui/core/TableHead'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTableCell from '@material-ui/core/TableCell'
import MuiTableBody from '@material-ui/core/TableBody'
import MuiTableFooter from '@material-ui/core/TableFooter'
import MuiTablePagination from '@material-ui/core/TablePagination'
import Tooltip from '@material-ui/core/Tooltip'
import MuiTableSortLabel from '@material-ui/core/TableSortLabel'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { useQuery } from 'graphql-hooks'

const Table = ({
  headers,
  pageSizes = [10, 20, 50],
  renderTableBody,
  orderBy: orderByProp = { id: 'asc' },
  query,
  variables,
  testid,
}) => {
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

  if (!data && loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Error loading data.</Typography>

  return (
    <Paper data-testid={testid}>
      <MuiTable>
        <MuiTableHead>
          <MuiTableRow>
            {headers.map(({ id, sortable, cellProps, label }) => {
              if (!sortable) {
                return (
                  <MuiTableCell key={id} {...cellProps}>
                    {label}
                  </MuiTableCell>
                )
              }
              const columnIsOrdered = orderBy.hasOwnProperty(id)
              return (
                <MuiTableCell
                  key={id}
                  sortDirection={columnIsOrdered ? orderBy[id] : false}
                  {...cellProps}
                >
                  <Tooltip title="Sort" enterDelay={300}>
                    <MuiTableSortLabel
                      active={columnIsOrdered}
                      direction={orderBy[id]}
                      onClick={() =>
                        setOrderBy({
                          [id]: orderBy[id] === 'asc' ? 'desc' : 'asc',
                        })
                      }
                    >
                      {label}
                    </MuiTableSortLabel>
                  </Tooltip>
                </MuiTableCell>
              )
            })}
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>{renderTableBody(data)}</MuiTableBody>
        <MuiTableFooter>
          <MuiTableRow>
            <MuiTablePagination
              rowsPerPageOptions={pageSizes}
              colSpan={headers.length}
              count={data.field_aggregate.aggregate.count}
              rowsPerPage={pageSize}
              page={Math.floor(offset / pageSize)}
              onChangePage={(event, page) => setOffset(page * pageSize)}
              onChangeRowsPerPage={event => setPageSize(event.target.value)}
            />
          </MuiTableRow>
        </MuiTableFooter>
      </MuiTable>
    </Paper>
  )
}

Table.propTypes = {
  headers: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      label: T.string.isRequired,
      sortable: T.bool,
      cellProps: T.object,
    })
  ).isRequired,
  pageSizes: T.arrayOf(T.number).isRequired,
  renderTableBody: T.func.isRequired,
  testid: T.string,
}

export default Table
