import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const endOfFirstSentence = content => {
  const result = /\.|\?|!/.exec(content)
  if (result) {
    return result.index + 1
  }

  return 0
}

const PageSEO = ({ siteName, content, canonicalHref, title }) => (
  <Helmet>
    <title>
      {title} | {siteName}
    </title>
    <link rel="canonical" href={canonicalHref} />
    <meta
      name="description"
      content={content.slice(0, endOfFirstSentence(content))}
    />
  </Helmet>
)
PageSEO.propTypes = {
  siteName: PropTypes.string,
  content: PropTypes.string,
  canonicalHref: PropTypes.string,
  title: PropTypes.string,
}
PageSEO.defaultProps = {
  siteName: 'Acme',
  content: '',
  canonicalHref: '',
  title: '',
}

export default PageSEO
