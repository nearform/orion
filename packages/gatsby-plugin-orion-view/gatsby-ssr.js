import React from 'react'
import Layout from './src/components/Layout'
import LayoutProvider from './src/components/LayoutProvider'

export const wrapRootElement = ({ element }, { layouts }) => (
  <LayoutProvider layouts={layouts}>
    {element}
  </LayoutProvider>
)

export const wrapPageElement = ({ element, props: { pageContext } }) => {
  const parents = [{ title: 'Home', to: '/' }]

  if (pageContext.content && pageContext.content.id) {
    parents.push({
      title: pageContext.content.title,
      to: pageContext.content.path,
    })
  }

  return <Layout parents={parents}>{element}</Layout>
}
