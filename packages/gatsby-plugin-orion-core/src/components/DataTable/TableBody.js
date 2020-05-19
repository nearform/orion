import React from 'react'
import T from 'prop-types'
import { TableBody as Body, TableCell, TableRow } from '@material-ui/core'

function TableBody({ data, columns, id }) {
  return (
    <Body>
      {data.map(row => (
        <TableRow key={id}>
          {columns.map(({ id, render }) => (
            <TableCell key={id}>
              {render === undefined ? row[id] : render(row[id], row)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Body>
  )
}

TableBody.propTypes = {
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
  data: T.arrayOf(T.object).isRequired,
  id: T.symbol.isRequired,
}
export default TableBody
