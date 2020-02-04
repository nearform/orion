import React from 'react'
import { Router } from '@reach/router' // eslint-disable-line import/no-extraneous-dependencies
import ContentView from '../components/ContentView'

export default function Content() {
  return (
    <Router>
      <ContentView path="/content/:slug" />
    </Router>
  )
}
