import React from 'react'
import { Redirect } from '@reach/router'
import { graphql } from 'gatsby'

export default function Assessment({ data }) {
  // redirect to the first assessment until we have a landing page
  return <Redirect to={`assessment/${data.assessments.key}`} noThrow />
}

export const pageQuery = graphql`
  {
    assessments {
      key
    }
  }
`
