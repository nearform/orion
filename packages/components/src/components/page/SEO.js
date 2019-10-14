import React, { useContext } from 'react'
import SEOHeaders from './SEOHeaders'
import StaticQueryContext from '../StaticQueryContext'

function SEO(props) {
  const { querySiteMetadata } = useContext(StaticQueryContext)
  if (!querySiteMetadata) {
    throw new Error('No querySiteMetadata in StaticQueryContext')
  }

  const site = querySiteMetadata()

  return <SEOHeaders site={site} {...props} />
}

const propTypes = Object.assign({}, SEOHeaders.propTypes)
delete propTypes.site
SEO.propTypes = propTypes

export default SEO
