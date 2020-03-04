import React from 'react'
import T from 'prop-types'
import Layout from '../../components/Layout'

function HomeLayout({ main, page }) {
  return (
    <Layout page={page}>
      <h1>Home</h1>
      <div>{main}</div>
    </Layout>
  )
}

HomeLayout.propTypes = {
  main: T.node.isRequired,
  page: T.object.isRequired,
}

export default HomeLayout
