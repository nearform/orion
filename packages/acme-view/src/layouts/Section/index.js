import React from 'react'
import Layout from '../../components/Layout'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'

function SectionLayout({ main, page, menu }) {
  return (
    <Layout page={page} menu={menu}>
      <PaddedContainer>
        <h1>{page.title}</h1>
        <div>{main}</div>
      </PaddedContainer>
    </Layout>
  )
}

export default SectionLayout
