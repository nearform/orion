import React from 'react'
import T from 'prop-types'

import {
  TableCell,
  TableHead as Header,
  TableSortLabel,
} from '@material-ui/core'

function TableHead({
  columns,
  activeSortId,
  activeSortDirection,
  onChangeSort,
}) {
  return (
    <Header>
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
    </Header>
  )
}

TableHead.propTypes = {
  activeSortDirection: T.oneOf(['asc', 'desc']),
  activeSortId: T.symbol.isRequired,
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
  onChangeSort: T.func.isRequired,
}

TableHead.defaultProps = {
  activeSortDirection: 'asc',
}

export default TableHead
