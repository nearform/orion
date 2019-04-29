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
} from '@material-ui/core'

export default function AdminTable({
  query,
  variables,
  pageTitle,
  headers,
  AdminTableContent,
  Modal,
}) {
  const DROPDOWN_SELECT = [4, 8, 12]
  const [selected, setSelected] = useState(null)
  const [offset, setOffset] = useState(DROPDOWN_SELECT[0])
  const [rowsPerPage, setRowsPerPage] = useState(4)

  const { loading, error, data, refetch } = useQuery(query, {
    variables: { ...variables, offset: offset, limit: rowsPerPage },
  })

  const changePage = (event, page) => {
    setOffset(page * rowsPerPage)
  }

  const handleChangeRowsPerPage = event => setRowsPerPage(event.target.value)

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
            {headers.map((header, index) => (
              <TableCell key={`${index}_${header}`}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <AdminTableContent data={data} setSelected={setSelected} />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={DROPDOWN_SELECT}
              colSpan={headers.length}
              count={data.field_aggregate.aggregate.count}
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
