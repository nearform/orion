import React from 'react'
import Layout from '../../components/Layout'

function HomeLayout({ main, page, menu }) {
  return (
    <Layout page={page} menu={menu}>
      <h1>Home</h1>
      <div>{main}</div>
    </Layout>
  )
}

export default HomeLayout
