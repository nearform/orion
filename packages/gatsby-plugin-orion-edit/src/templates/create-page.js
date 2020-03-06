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
      title: 'New page',
      path: '',
      ancestry: [
        ...data.orion_page[0].ancestry,
        {
          ancestor: {
            id,
            title: data.orion_page[0].title,
          },
        },
      ],
      authors: [],
      contents: [],
      show_in_menu: true, // eslint-disable-line camelcase
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
