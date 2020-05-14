import React, { useMemo } from 'react'
import EditPage from '../components/EditPage'
import getPageQuery from '../queries/get-page'
import { navigate } from '@reach/router'
import { useQuery } from 'graphql-hooks'

export default function({ id }) {
  const { data, loading } = useQuery(getPageQuery, {
    variables: { id },
  })

  const initialState = useMemo(() => {
    if (loading || data.orion_page.length !== 1) {
      return null
    }

    return {
      title: `New Page`,
      path: '',
      ancestry: [
        ...data.orion_page[0].ancestry,
        {
          ancestor: {
            id,
            path: data.orion_page[0].path,
            title: data.orion_page[0].title,
          },
        },
      ],
      authors: [
        {
          user: {
            id: 1,
          },
        },
      ],
      contents: [],
      descendants: [],
      show_in_menu: true, // eslint-disable-line camelcase,
      allTags: data.orion_tag,
      tags: [],
    }
  }, [data, id, loading])

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
