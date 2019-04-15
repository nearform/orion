import React from 'react'
import { Link, graphql } from 'gatsby'
import slugify from 'slugify'
import { Typography } from '@material-ui/core'

import Layout from '../components/layout'
import SEO from '../components/seo'

function Homepage({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const articles = data.knowledgebase.article

  return (
    <Layout location={location}>
      <SEO title="All articles" keywords={[`knowledgebase`, `NearForm`]} />
      <Typography variant="h2">{siteTitle}</Typography>
      <Typography variant="subtitle1">
        Not much to see yet, but stay tuned
      </Typography>
      {articles.map(article => {
        return (
          <div key={article.id}>
            <Typography variant="h3">
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
    </Layout>
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
