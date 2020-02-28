import React from 'react'
import ComponentProvider from './src/components/ComponentProvider'
import LayoutProvider from './src/components/LayoutProvider'

export const wrapRootElement = ({ element }) => {
  return (
    <LayoutProvider>
      <ComponentProvider>{element}</ComponentProvider>
    </LayoutProvider>
  )
}
