import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SeoHeaders } from 'components'

function Seo(props) {
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

  return <SeoHeaders site={site} {...props} />
}

const propTypes = Object.assign({}, SeoHeaders.propTypes)
delete propTypes.site
Seo.propTypes = propTypes

export default Seo
