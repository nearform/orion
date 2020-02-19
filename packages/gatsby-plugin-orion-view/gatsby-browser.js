import React from 'react'
import Layout from './src/components/Layout'
import ComponentProvider from './src/components/ComponentProvider'
import LayoutProvider from './src/components/LayoutProvider'

export const wrapRootElement = ({ element }) => (
  <LayoutProvider>
    <ComponentProvider>
      {element}
    </ComponentProvider>
  </LayoutProvider>
)

export const wrapPageElement = ({ element, props: { pageContext } }) => {
  const { article } = pageContext
  const parents = [{ title: 'Home', to: '/' }]

  if (article) {
    parents.push({ title: article.title, to: article.path })
  }

  return <Layout parents={parents}>{element}</Layout>
}
