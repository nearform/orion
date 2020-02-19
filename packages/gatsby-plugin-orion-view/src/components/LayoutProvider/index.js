import React, { createContext, useContext, useMemo, useState } from 'react'
import T from 'prop-types'

import ArticleLayout from '../../layouts/Article'
import HomeLayout from '../../layouts/Home'
import SectionLayout from '../../layouts/Section'

const layouts = {
  article: ArticleLayout,
  home: HomeLayout,
  section: SectionLayout,
}

const LayoutContext = createContext({
  get: () => {},
})

function LayoutProvider({ children }) {
  const [available, setAvailable] = useState(layouts)

  const value = useMemo(() => ({
    get: name => {
      if (available[name] === undefined) {
        throw new Error(`Layout "${name}" not found`)
      }

      return available[name]
    },
  }), [available])

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}

LayoutProvider.propTypes = {
  children: T.element,
}

export function useLayout(name) {
  const { get } = useContext(LayoutContext)

  return get(name)
}

export default LayoutProvider
