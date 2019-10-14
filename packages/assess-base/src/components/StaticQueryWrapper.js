import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticQueryContext } from 'components'

const querySiteMetadata = () => {
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
  return site
}

export const queryUserGroup = () => {
  const queryResult = useStaticQuery(graphql`
    query {
      raw_salmon {
        group {
          id
          type
          name
        }
      }
    }
  `)
  return queryResult
}

export default function({ children }) {
  const queries = { querySiteMetadata, queryUserGroup }
  return (
    <StaticQueryContext.Provider value={queries}>
      {children}
    </StaticQueryContext.Provider>
  )
}
