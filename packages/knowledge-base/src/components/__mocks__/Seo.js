import React from 'react'
import { SeoHeaders } from 'components'
const site = {
  siteMetadata: {
    title: 'EFQM Assess Base',
    description: "EFQM's Digital Assess Base.",
    author: 'EFQM',
  },
}
export default () => <SeoHeaders site={site} title="Test" />
