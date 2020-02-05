import React from 'react'

import ContentListView from '../components/ContentListView'

export default function Content({ pageContext }) {
  const { page, results } = pageContext
  return <ContentListView page={page} results={results} />
}
