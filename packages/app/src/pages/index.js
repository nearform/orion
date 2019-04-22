import React from 'react'
import { Link, graphql } from 'gatsby'
import slugify from 'slugify'
import { Typography } from '@material-ui/core'

import SEO from '../components/seo'

function Homepage({ data }) {
  const siteTitle = data.site.siteMetadata.title
  const articles = data.knowledgebase.article

  return (
    <>
      <SEO title="All articles" keywords={[`knowledgebase`, `NearForm`]} />
      <Typography variant="h1" gutterBottom>
        {siteTitle}
      </Typography>
      <Typography variant="h6">Not much to see yet, but stay tuned</Typography>
      {articles.map(article => {
        return (
          <div key={article.id}>
            <Typography variant="h2">
              <Link to={`${article.id}/${slugify(article.title)}`}>
                {article.title}
              </Link>
            </Typography>
            <small>{article.published_at}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: article.description,
              }}
            />
          </div>
        )
      })}
    </>
  )
}

export default Homepage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    knowledgebase {
      article {
        id
        title
        description
        content
        published_at
        author {
          id
          name
        }
      }
    }
  }
`
