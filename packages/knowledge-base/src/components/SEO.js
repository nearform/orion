/* eslint-disable unicorn/filename-case */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SEOHeaders } from 'components'

function SEO(props) {
  // Gatsby's static queries must be a static string in a file in the gatsby app
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  return <SEOHeaders site={site} {...props} />
}

const propTypes = Object.assign({}, SEOHeaders.propTypes)
delete propTypes.site
SEO.propTypes = propTypes

export default SEO
