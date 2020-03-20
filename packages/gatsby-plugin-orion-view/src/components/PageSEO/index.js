import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const endOfFirstSentence = content => /\.|\?|!/.exec(content)

const PageSEO = ({ siteName = 'Acme', content, canonicalHref, title }) => (
  <Helmet>
    <title>
      {title} | {siteName}
    </title>
    <link rel="canonical" href={canonicalHref} />
    <meta
      name="description"
      content={content.slice(0, endOfFirstSentence(content).index + 1)}
    />
  </Helmet>
)
PageSEO.prototype = {
  siteName: PropTypes.string,
  content: PropTypes.string,
  canonicalHref: PropTypes.string,
  title: PropTypes.string,
}

export default PageSEO
