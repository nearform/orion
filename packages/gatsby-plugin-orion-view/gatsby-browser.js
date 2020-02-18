import React from 'react'
import Layout from './src/components/Layout'

export const wrapPageElement = ({ element, props: { pageContext } }) => {
  const { article } = pageContext
  const parents = [{ title: 'Home', to: '/' }]

  if (article) {
    parents.push({ title: article.title, to: article.path })
  }

  return <Layout parents={parents}>{element}</Layout>
}
