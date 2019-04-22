import React from 'react'
import { Link, graphql } from 'gatsby'
import { Typography } from '@material-ui/core'

import SEO from '../components/seo'

class ArticleTemplate extends React.Component {
  render() {
    const { previous, next, article } = this.props.pageContext

    return (
      <>
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
      </>
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
