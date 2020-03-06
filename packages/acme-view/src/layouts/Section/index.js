import React from 'react'
import Layout from '../../components/Layout'

function SectionLayout({ main, page, menu }) {
  return (
    <Layout page={page} menu={menu}>
      <h1>{page.title}</h1>
      <div>{main}</div>
    </Layout>
  )
}

export default SectionLayout
