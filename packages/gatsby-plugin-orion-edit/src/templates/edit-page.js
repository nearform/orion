import React from 'react'
import EditPage from '../components/EditPage'
import getPageQuery from '../queries/get-page'
import { useQuery } from 'graphql-hooks'

export default function({ id }) {
  const { data, loading, refetch } = useQuery(getPageQuery, {
    variables: { id },
  })

  if (loading || data.orion_page.length !== 1) {
    return null
  }

  return <EditPage initialState={data.orion_page[0]} onSave={refetch} />
}
