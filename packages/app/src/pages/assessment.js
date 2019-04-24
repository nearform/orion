import React from 'react'
import { Redirect } from '@reach/router'
import { graphql } from 'gatsby'
import slugify from 'slugify'

export default function Assessment({ data }) {
  // redirect to the first assessment until we have a landing page
  return (
    <Redirect to={`assessment/${slugify(data.assessments.name)}`} noThrow />
  )
}

export const pageQuery = graphql`
  {
    assessments {
      name
    }
  }
`
