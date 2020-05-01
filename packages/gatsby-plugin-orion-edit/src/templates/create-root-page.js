import React, { useMemo } from 'react'
import EditPage from '../components/EditPage'
import getTagsQuery from '../queries/get-tags'
import { navigate } from '@reach/router'
import { useQuery } from 'graphql-hooks'

export default function() {
  const { data, loading } = useQuery(getTagsQuery)

  console.log('create-root-page # data', data)

  const initialState = useMemo(() => {
    if (loading) {
      return null
    }

    return {
      title: '',
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
      // Show_in_menu: (type === 'page'), // eslint-disable-line camelcase
      show_in_menu: true, // eslint-disable-line camelcase
      allTags: data.orion_tag,
      tags: [],
    }
  }, [data, loading])

  if (!initialState) {
    return null
  }

  return (
    <EditPage
      // Type={type}
      initialState={initialState}
      onSave={({ id }) => navigate(`/pages/${id}/edit`)}
    />
  )
}
