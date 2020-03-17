import React from 'react'
import AuthWrapper from './src/components/AuthWrapper'
import GraphQLProvider from './src/components/GraphQLProvider'

export const wrapRootElement = ({ element }) => (
  <AuthWrapper>
    <GraphQLProvider>{element}</GraphQLProvider>
  </AuthWrapper>
)
