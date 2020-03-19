import React, { useEffect } from 'react'
import { loadCSS } from 'fg-loadcss'
import AuthWrapper from './src/components/AuthWrapper'
import GraphQLProvider from './src/components/GraphQLProvider'

function FontAwesomeLoader({ children }) {
  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.1/css/all.css',
      document.querySelector('#font-awesome-css')
    )
  }, [])

  return children
}

export const wrapRootElement = ({ element }) => (
  <FontAwesomeLoader>
    <AuthWrapper>
      <GraphQLProvider>{element}</GraphQLProvider>
    </AuthWrapper>
  </FontAwesomeLoader>
)
