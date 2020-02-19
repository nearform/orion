import React from 'react'
import { map, uniq } from 'lodash'
import { useComponents } from '../ComponentProvider'
import { useLayout } from '../LayoutProvider'

function PageView({ pageContext: { page } }) {
  const { contents, layout } = page
  const components = useComponents(uniq(map(contents, 'component')))

  const Layout = useLayout(layout)
  const blocks = {}

  for (const { block, component, id, props } of contents) {
    const Component = components[component]

    if (blocks[block] === undefined) {
      blocks[block] = []
    }

    blocks[block].push(<Component key={id} page={page} {...props} />)
  }

  return (
    <Layout page={page} {...blocks} />
  )
}

export default PageView
