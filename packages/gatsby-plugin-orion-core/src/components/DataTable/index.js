import React from 'react'
import T from 'prop-types'
import {
  Paper,
  Table,
  TableContainer,
  TablePagination,
  TableFooter,
} from '@material-ui/core'

import TableHead from './TableHead'
import TableBody from './TableBody'

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
  return (
    <TableContainer component={container || Paper}>
      <Table>
        <TableHead
          columns={columns}
          activeSortId={activeSortId}
          activeSortDirection={activeSortDirection}
          onChangeSort={onChangeSort}
        />
        <TableBody data={data} columns={columns} id={id} />
        {isPaginated && (
          <TableFooter>
            <TablePagination
              count={rowCount}
              page={page || 0}
              rowsPerPage={rowsPerPage || 10}
              onChangePage={(event, page) => onChangePage(page)}
              onChangeRowsPerPage={event =>
                onChangeRowsPerPage(event.target.value)
              }
            />
          </TableFooter>
        )}
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
