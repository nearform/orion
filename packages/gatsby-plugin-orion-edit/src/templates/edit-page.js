import React from 'react'
import EditPage from '../components/EditPage'
import getPageQuery from '../queries/get-page'
import { useQuery } from 'graphql-hooks'
import { navigate } from '@reach/router'

export default function({ id }) {
  const { data, loading, refetch } = useQuery(getPageQuery, {
    variables: { id },
  })

  if (loading || data.orion_page.length !== 1) {
    if (!loading && data.orion_page.length === 0) {
      console.warn(`No page with id ${id} found. Redirecting to root.`)
      navigate('/')
    }

    return null
  }

  const initialState = {
    ...data.orion_page[0],
    allTags: data.orion_tag,
  }

  return <EditPage initialState={initialState} onSave={refetch} />
}
