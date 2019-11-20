import React from 'react'
import { Router } from '@reach/router'
import ContentView from '../components/ContentView'

export default function Content() {
  return (
    <Router>
      <ContentView path="/content/:slug" />
    </Router>
  )
}
