import React from 'react'
import EditPage from '../components/EditPage'

export default function () {
  const initialState = {
    title: 'New page',
    path: '',
    ancestry: [],
    authors: [],
    contents: [],
    show_in_menu: true,
  }

  return (
    <EditPage initialState={initialState} onSave={() => {}} />
  )
}
