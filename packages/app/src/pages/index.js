import React from 'react'
import { Link, graphql } from 'gatsby'
import slugify from 'slugify'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

function Homepage({ data, location, ...props }) {
  const siteTitle = data.site.siteMetadata.title
  const articles = data.knowledgebase.article

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All articles" keywords={[`knowledgebase`, `NearForm`]} />
      {articles.map(article => {
        return (
          <div key={article.id}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link
                style={{ boxShadow: `none` }}
                to={`${article.id}/${slugify(article.title)}`}
              >
                {article.title}
              </Link>
            </h3>
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
