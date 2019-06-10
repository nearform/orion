import React from 'react'
import T from 'prop-types'
import {
  Paper,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core'

const Table = ({
  data,
  headers,
  offset,
  pageSize,
  orderBy,
  setPageSize,
  setOrderBy,
  setOffset,
  pageSizes,
  renderTableBody,
}) => {
  const toggleOrder = order => (order === 'asc' ? 'desc' : 'asc')

  const handleChangePage = (event, page) => setOffset(page * pageSize)

  const handleChangePageSize = event => setPageSize(event.target.value)

  const handleChangeOrderBy = property =>
    setOrderBy({ [property]: toggleOrder(orderBy[property]) })

  if (!headers.length) return 'No table headers to show'

  return (
    <Paper>
      <MuiTable>
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
                      onClick={() => handleChangeOrderBy(id)}
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
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangePageSize}
            />
          </TableRow>
        </TableFooter>
      </MuiTable>
    </Paper>
  )
}

Table.defaultProps = {
  orderBy: { id: 'asc' },
}

Table.propTypes = {
  children: T.node,
  data: T.object.isRequired,
  headers: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      label: T.string.isRequired,
      sortable: T.bool,
      cellProps: T.object,
    })
  ).isRequired,
  pageTitle: T.node,
  offset: T.number.isRequired,
  pageSize: T.number.isRequired,
  orderBy: T.object.isRequired,
  setPageSize: T.func.isRequired,
  setOrderBy: T.func.isRequired,
  setOffset: T.func.isRequired,
  pageSizes: T.arrayOf(T.number).isRequired,
  renderTableBody: T.func.isRequired,
}

export default Table
