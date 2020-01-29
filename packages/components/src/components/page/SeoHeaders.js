import React from 'react'
import T from 'prop-types'
import Helmet from 'react-helmet'

function SeoHeaders({ site, description, lang, meta, keywords, title }) {
  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(', '),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SeoHeaders.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
}

SeoHeaders.propTypes = {
  site: T.object.isRequired,
  description: T.string,
  lang: T.string,
  meta: T.array,
  keywords: T.arrayOf(T.string),
  title: T.string.isRequired,
}

export default SeoHeaders
