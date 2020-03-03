import React from 'react'
import T from 'prop-types'
import Layout from '../../components/Layout'

function SectionLayout({ main, page }) {
  return (
    <Layout page={page}>
      <h1>
        {page.title}
      </h1>
      <div>
        {main}
      </div>
    </Layout>
  )
}

SectionLayout.propTypes = {
  main: T.node.isRequired,
  page: T.object.isRequired,
}

export default SectionLayout
