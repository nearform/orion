import React from 'react'
import T from 'prop-types'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core'

export default function AdminTable({
  children,
  data,
  headers,
  offset,
  pageSize,
  orderBy,
  setPageSize,
  setOrderBy,
  setOffset,
  pageSizes,
}) {
  const toggleOrder = order => (order === 'asc' ? 'desc' : 'asc')

  const handleChangePage = (event, page) => setOffset(page * pageSize)

  const handleChangePageSize = event => setPageSize(event.target.value)

  const handleChangeOrderBy = property =>
    setOrderBy({ [property]: toggleOrder(orderBy[property]) })

  if (headers.length === 0) return 'No table headers to show'
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => {
              if (!header.sortable) {
                return (
                  <TableCell key={header.id} {...header.cellProps}>
                    {header.label}
                  </TableCell>
                )
              }

              const columnIsOrdered = Object.prototype.hasOwnProperty.call(
                orderBy,
                header.id
              )
              return (
                <TableCell
                  key={header.id}
                  sortDirection={columnIsOrdered ? orderBy[header.id] : false}
                  {...header.cellProps}
                >
                  <Tooltip title="Sort" enterDelay={300}>
                    <TableSortLabel
                      active={columnIsOrdered}
                      direction={orderBy[header.id]}
                      onClick={() => handleChangeOrderBy(header.id)}
                    >
                      {header.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
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
      </Table>
    </Paper>
  )
}

AdminTable.propTypes = {
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
}