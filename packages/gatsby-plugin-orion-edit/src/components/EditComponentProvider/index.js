import React, { createContext, useContext, useMemo } from 'react'
import T from 'prop-types'

const EditComponentContext = createContext({
  components: {},
  layouts: {},
  wrapper: React.Fragment,
})

function EditComponentProvider({
  children,
  components = {},
  layouts = {},
  wrapper = React.Fragment,
}) {
  const value = useMemo(
    () => ({
      components,
      layouts,
      wrapper,
    }),
    [components, layouts, wrapper]
  )

  return (
    <EditComponentContext.Provider value={value}>
      {children}
    </EditComponentContext.Provider>
  )
}

EditComponentProvider.propTypes = {
  children: T.node.isRequired,
  components: T.objectOf(
    T.shape({
      editor: T.elementType.isRequired,
      settings: T.elementType.isRequired,
    })
  ).isRequired,
  layouts: T.objectOf(
    T.shape({
      blocks: T.arrayOf(T.string.isRequired).isRequired,
      editor: T.elementType.isRequired,
      example: T.elementType,
      name: T.string.isRequired,
    })
  ).isRequired,
  wrapper: T.elementType,
}

export function useEditComponents() {
  return useContext(EditComponentContext)
}

export default EditComponentProvider
