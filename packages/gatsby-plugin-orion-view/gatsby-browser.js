import React from 'react'
import Layout from './src/components/Layout'
import RootWrapper from './src/components/RootWrapper'

export const wrapRootElement = ({ element }) => {
  return (
    <RootWrapper>
      {element}
    </RootWrapper>
  )
}

export const wrapPageElement = ({ element }) => {
  return (
    <Layout>
      {element}
    </Layout>
  )
}
