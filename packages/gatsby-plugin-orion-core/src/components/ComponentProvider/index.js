import React, { createContext, useContext, useMemo } from 'react'
import T from 'prop-types'

const ComponentContext = createContext({
  components: {},
  layouts: {},
})

function ComponentProvider({
  children,
  components = {},
  layouts = {},
}) {
  const value = useMemo(() => ({ components, layouts }), [components, layouts])
  
  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  )
}

ComponentProvider.propTypes = {
  children: T.node.isRequired,
  components: T.object,
  layouts: T.object,
}

ComponentProvider.defaultProps = {
  components: undefined,
}

export function useComponents() {
  return useContext(ComponentContext)
}

export default ComponentProvider
