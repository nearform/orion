import React from 'react'

import ContentView from '../components/ContentView'

export default function Content({ slug, pageContext }) {
  const { articleSummary } = pageContext
  return <ContentView slug={slug} articleSummary={articleSummary} />
}
