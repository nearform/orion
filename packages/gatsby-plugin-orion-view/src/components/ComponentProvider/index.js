import React, { createContext, useContext, useMemo, useState } from 'react'
import T from 'prop-types'

import ArticleContent from '../ArticleContent/wrap'
import ListChildren from '../ListChildren'
import ArticleMetadata from '../ArticleMetadata/wrap'

const components = {
  article_content: ArticleContent,
  article_metadata: ArticleMetadata,
  list_children: ListChildren,
}

const ComponentContext = createContext({
  get: () => {},
})

function ComponentProvider({ children }) {
  const [available, setAvailable] = useState(components)

  const value = useMemo(() => ({
    get: name => {
      if (available[name] === undefined) {
        throw new Error(`Component "${name}" not found`)
      }

      return available[name]
    },
  }), [available])

  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  )
}

ComponentProvider.propTypes = {
  children: T.element,
}

export function useComponents(names) {
  const { get } = useContext(ComponentContext)
  const found = {}

  for (const name of names) {
    found[name] = get(name)
  }

  return found
}

export default ComponentProvider
