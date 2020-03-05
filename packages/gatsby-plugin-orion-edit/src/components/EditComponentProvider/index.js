import React, { createContext, useContext, useMemo } from 'react'
import T from 'prop-types'

const EditComponentContext = createContext({
  components: {},
  layouts: {},
})

function EditComponentProvider({
  children,
  components = {},
  layouts = {},
}) {
  const value = useMemo(() => ({ components, layouts }), [components, layouts])
  
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
      blocks: T.arrayOf(T.string.isRequired).isRequired,
      preview: T.elementType,
    })
  ).isRequired,
  layouts: T.objectOf(
    T.shape({
      editor: T.elementType.isRequired,
      preview: T.elementType,
    })
  ).isRequired,
}

export function useEditComponents() {
  return useContext(EditComponentContext)
}

export default EditComponentProvider
