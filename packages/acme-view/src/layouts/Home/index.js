import React from 'react'
import Layout from '../../components/Layout'

function HomeLayout({ main, page }) {
  return (
    <Layout page={page}>
      <h1>
        Home
      </h1>
      <div>
        {main}
      </div>
    </Layout>
  )
}

export default HomeLayout
