import React, { createContext, useContext, useMemo } from 'react'
import T from 'prop-types'

const EditComponentContext = createContext({
  components: {},
  layouts: {},
  PreviewWrapper: React.Fragment,
})

function EditComponentProvider({
  children,
  components = {},
  layouts = {},
  PreviewWrapper = React.Fragment,
}) {
  const value = useMemo(
    () => ({
      components,
      layouts,
      PreviewWrapper,
    }),
    [components, layouts, PreviewWrapper]
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
  PreviewWrapper: T.elementType,
}

export function useEditComponents() {
  return useContext(EditComponentContext)
}

export default EditComponentProvider
