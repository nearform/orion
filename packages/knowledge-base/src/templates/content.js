import React from 'react'
import { graphql } from 'gatsby'

import ContentView from '../components/ContentView'

function Content({ slug, pageContext, data }) {
  //const { edges } = data

  //console.log(edges)

  const { articleSummary } = pageContext

  return <ContentView slug={slug} articleSummary={articleSummary} />
}

export const query = graphql`
  query S3ImageQuery {
    allS3Image {
      edges {
        node {
          Key
          Url
        }
      }
    }
  }
`
export default Content
