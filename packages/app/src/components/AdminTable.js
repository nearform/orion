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
} from '@material-ui/core'
import TableSortLabel from '@material-ui/core/TableSortLabel'

export default function AdminTable({
  query,
  variables,
  pageTitle,
  headers,
  AdminTableContent,
  Modal,
}) {
  const [selected, setSelected] = useState(null)
  const [offset, setOffset] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(4)
  const [orderObject, setOrderObject] = useState({
    order: 'asc',
    orderBy: 'id',
  })

  const { loading, error, data, refetch } = useQuery(query(orderObject.order), {
    variables: { ...variables, offset: offset, limit: rowsPerPage },
  })

  const changePage = (event, page) => {
    setOffset(page * rowsPerPage)
  }

  const handleChangeRowsPerPage = event => setRowsPerPage(event.target.value)

  const sortColumn = (property, event) => {
    const toOrderBy = property
    let toOrder = 'desc'
    if (toOrderBy === property && orderObject.order === 'desc') {
      toOrder = 'asc'
    }
    setOrderObject({ order: toOrder, orderBy: toOrderBy })
  }

  // TODO: for dev convenience, instead extract array of default headers from query
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
            {headers.map(header => (
              <TableCell
                key={header.key}
                sortDirection={
                  orderObject.orderBy === header.id ? orderObject.order : false
                }
              >
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel
                    active={orderObject.orderBy === header.id}
                    direction={orderObject.order}
                    onClick={e => sortColumn(header.id)}
                  >
                    {header.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <AdminTableContent data={data} setSelected={setSelected} />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[4, 8, 12]}
              colSpan={headers.length}
              count={data.user_aggregate.aggregate.count}
              rowsPerPage={rowsPerPage}
              page={Math.floor(offset / rowsPerPage)}
              onChangePage={changePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
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
  headers: T.arrayOf(T.string).isRequired,
  AdminTableContent: T.func.isRequired,
  Modal: T.func,
}
