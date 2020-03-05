import React from 'react'
import EditPage from '../components/EditPage'
import { navigate } from '@reach/router'

export default function() {
  const initialState = {
    title: 'New page',
    path: '',
    ancestry: [],
    authors: [],
    contents: [],
    // eslint-disable-next-line camelcase
    show_in_menu: true,
  }

  return (
    <EditPage
      initialState={initialState}
      onSave={({ id }) => navigate(`/pages/${id}/edit`)}
    />
  )
}
