import React from 'react'
import EditArticle from '../components/EditArticle'
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

  return <EditArticle initialState={initialState} onSave={refetch} />
}
