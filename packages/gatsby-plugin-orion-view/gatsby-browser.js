import React from 'react'
import { ComponentProvider } from 'gatsby-plugin-orion-core'

export const wrapRootElement = ({ element }) => {
  return (
    <ComponentProvider>
      {element}
    </ComponentProvider>
  )
}
