import React, { useMemo } from 'react'
import EditPage from '../components/EditPage'
import getTagsQuery from '../queries/get-tags'
import { navigate } from '@reach/router'
import { useQuery } from 'graphql-hooks'

export default function() {
  const { data, loading } = useQuery(getTagsQuery)

  const initialState = useMemo(() => {
    if (loading) {
      return null
    }

    return {
      title: 'New page',
      path: '',
      ancestry: [],
      authors: [
        {
          user: {
            id: 1,
          },
        },
      ],
      contents: [],
      descendants: [],
      show_in_menu: true, // eslint-disable-line camelcase

      allTags: data.orion_tag,
    }
  }, [data, loading])

  if (!initialState) {
    return null
  }

  return (
    <EditPage
      initialState={initialState}
      onSave={({ id }) => navigate(`/pages/${id}/edit`)}
    />
  )
}
