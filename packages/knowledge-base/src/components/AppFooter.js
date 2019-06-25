import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { Footer } from 'components'

function AppFooter() {
  // Gatsby's static queries must be a static string in a file in the gatsby app
  const content = useStaticQuery(graphql`
    query {
      largeLogo: file(name: { eq: "large-logo" }) {
        childImageSharp {
          fixed(height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      socialIcons: allFile(
        filter: {
          extension: { in: ["png", "svg", "jpg", "gif"] }
          relativeDirectory: { eq: "social" }
          sourceInstanceName: { in: ["theme-assets", "app-assets"] }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              fixed(width: 28) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
      site {
        siteMetadata {
          author
          social
          version
        }
      }
    }
  `)

  return <Footer content={content} Img={Img} />
}

export default AppFooter
