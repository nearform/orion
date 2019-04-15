import React from 'react'
import { Link, graphql } from 'gatsby'
import slugify from 'slugify'
import { Typography } from '@material-ui/core'

import Layout from '../components/layout'
import SEO from '../components/seo'

function Homepage({ data, location, ...props }) {
  const siteTitle = data.site.siteMetadata.title
  const articles = data.knowledgebase.article

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All articles" keywords={[`knowledgebase`, `NearForm`]} />
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
