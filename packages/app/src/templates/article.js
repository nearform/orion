import React from 'react'
import { Link, graphql } from 'gatsby'
import { Typography } from '@material-ui/core'

import Layout from '../components/layout'
import SEO from '../components/seo'

class ArticleTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next, article } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={article.title} description={article.description} />
        <Typography variant="h1">{article.title}</Typography>
        <p>{article.published_at}</p>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
        <hr />
        <ul>
          <li>
            {previous && (
              <Link to={previous.title} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.title} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default ArticleTemplate

export const pageQuery = graphql`
  query ArticleTemplateQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`
