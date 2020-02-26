import React, { createContext, useContext } from 'react'
import T from 'prop-types'

const ComponentContext = createContext({})

function ComponentProvider({ children, components = {} }) {
  return (
    <ComponentContext.Provider value={components}>
      {children}
    </ComponentContext.Provider>
  )
}

ComponentProvider.propTypes = {
  children: T.node.isRequired,
  components: T.object,
}

ComponentProvider.defaultProps = {
  components: undefined,
}

export function useComponents() {
  return useContext(ComponentContext)
}

export default ComponentProvider
