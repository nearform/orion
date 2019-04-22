import React, { useState } from 'react'
import { useQuery } from 'graphql-hooks'
import T from 'prop-types'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core'

// This reduces duplication and will house generic admin table features
// like click-to-sort, pagination, filters and bulk actions

export default function AdminTable({
  query,
  variables,
  pageTitle,
  headers,
  AdminTableContent,
  Modal,
}) {
  const [selected, setSelected] = useState(null)

  const { loading, error, data, refetch } = useQuery(query, { variables })

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
        <AdminTableContent data={data} setSelected={setSelected} />
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
