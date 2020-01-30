import React from 'react'

import ContentView from 'gatsby-plugin-orion-core/components/ContentView'

function Content({ slug, pageContext }) {
  const { articleSummary, banner } = pageContext

  return (
    <ContentView slug={slug} articleSummary={articleSummary} imgSrc={banner} />
  )
}

export default Content
