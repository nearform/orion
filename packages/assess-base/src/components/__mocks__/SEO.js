import React from 'react'
import { SEOHeaders } from 'components'
const site = {
  siteMetadata: {
    title: 'EFQM Assess Base',
    description: "EFQM's Digital Assess Base.",
    author: 'EFQM',
  },
}
export default props => <SEOHeaders site={site} title="Test" />
