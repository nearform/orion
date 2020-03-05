import React, { createContext, useContext, useMemo } from 'react'
import T from 'prop-types'

const ViewComponentContext = createContext({
  components: {},
  layouts: {},
})

function ViewComponentProvider({
  children,
  components = {},
  layouts = {},
}) {
  const value = useMemo(() => ({ components, layouts }), [components, layouts])
  
  return (
    <ViewComponentContext.Provider value={value}>
      {children}
    </ViewComponentContext.Provider>
  )
}

ViewComponentProvider.propTypes = {
  children: T.node.isRequired,
  components: T.object,
  layouts: T.object,
}

ViewComponentProvider.defaultProps = {
  components: undefined,
}

export function useViewComponents() {
  return useContext(ViewComponentContext)
}

export default ViewComponentProvider
