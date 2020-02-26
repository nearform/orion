import React from 'react'
import Layout from '../../components/Layout'

function SectionLayout({ main, page }) {
  return (
    <Layout page={page}>
      <h1>{page.title}</h1>
      <div>{main}</div>
    </Layout>
  )
}

export default SectionLayout
