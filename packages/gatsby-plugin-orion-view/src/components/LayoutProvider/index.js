import React, { createContext, useContext } from 'react'
import T from 'prop-types'

const LayoutContext = createContext({})

function LayoutProvider({ children, layouts = {} }) {
  return (
    <LayoutContext.Provider value={layouts}>{children}</LayoutContext.Provider>
  )
}

LayoutProvider.propTypes = {
  children: T.node.isRequired,
  layouts: T.object,
}

LayoutProvider.defaultProps = {
  layouts: undefined,
}

export function useLayouts() {
  return useContext(LayoutContext)
}

export default LayoutProvider
