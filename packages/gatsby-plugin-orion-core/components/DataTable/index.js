import React from 'react'
import T from 'prop-types'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core'

function DataTable({
  activeSortDirection,
  activeSortId,
  columns,
  container,
  data,
  id,
  isPaginated = false,
  page = 0,
  rowCount,
  rowsPerPage = -1,
  onChangePage,
  onChangeRowsPerPage,
  onChangeSort,
}) {
  const header = (
    <TableHead>
      {columns.map(({ align, id, label, minWidth, sortable }) => (
        <TableCell key={id} align={align} style={{ minWidth }}>
          {sortable ? (
            <TableSortLabel
              active={activeSortId === id}
              direction={activeSortDirection || 'asc'}
              onClick={() =>
                onChangeSort(
                  id,
                  activeSortId === id
                    ? activeSortDirection === 'asc'
                      ? 'desc'
                      : 'asc'
                    : 'asc'
                )
              }
            >
              {label}
            </TableSortLabel>
          ) : (
            label
          )}
        </TableCell>
      ))}
    </TableHead>
  )

  const body = (
    <TableBody>
      {data.map(row => (
        <TableRow key={id}>
          {columns.map(({ id, render }) => (
            <TableCell key={id}>
              {render === undefined ? row[id] : render(row[id], row)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )

  const footer = isPaginated ? (
    <TableFooter>
      <TablePagination
        count={rowCount}
        page={page || 0}
        rowsPerPage={rowsPerPage || 10}
        onChangePage={(event, page) => onChangePage(page)}
        onChangeRowsPerPage={event => onChangeRowsPerPage(event.target.value)}
      />
    </TableFooter>
  ) : null

  return (
    <TableContainer component={container || Paper}>
      <Table>
        {header}
        {body}
        {footer}
      </Table>
    </TableContainer>
  )
}

DataTable.propTypes = {
  activeSortDirection: T.oneOf('asc', 'desc'),
  activeSortId: T.symbol,
  columns: T.arrayOf(
    T.shape({
      id: T.symbol.isRequired,
      label: T.string.isRequired,
      minWidth: T.number,
      align: T.oneOf(['left', 'right', 'center', 'justify']),
      render: T.func,
      sortable: T.bool,
    })
  ).isRequired,
  container: T.elementType,
  data: T.arrayOf(T.object).isRequired,
  id: T.symbol.isRequired,
  isPaginated: T.bool,
  page: T.number,
  rowCount: T.number.isRequired,
  rowsPerPage: T.number,
  onChangePage: T.func,
  onChangeRowsPerPage: T.func,
  onChangeSort: T.func,
}

export default DataTable
