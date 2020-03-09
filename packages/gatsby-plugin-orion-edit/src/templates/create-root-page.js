import React from 'react'
import EditPage from '../components/EditPage'
import { navigate } from '@reach/router'

export default function() {
  const initialState = {
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
    show_in_menu: true, // eslint-disable-line camelcase
  }

  return (
    <EditPage
      initialState={initialState}
      onSave={({ id }) => navigate(`/pages/${id}/edit`)}
    />
  )
}
