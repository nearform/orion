import React from 'react'

import ContentListView from 'gatsby-plugin-orion-core/components/ContentListView'

export default function Content({ slug, pageContext }) {
  const { page, results } = pageContext
  return <ContentListView page={page} results={results} />
}
