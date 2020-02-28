import React from 'react'
import getPageQuery from '../../queries/get-page'
import { useComponents } from '../ComponentProvider'
import { useLayouts } from '../LayoutProvider'
import { useQuery } from 'graphql-hooks'

function PageProvider({ location, pageContext }) {
  const { data, loading } = useQuery(getPageQuery, {
    variables: {
      path: location.pathname,
    },
  })

  const components = useComponents()
  const layouts = useLayouts()

  if (loading && pageContext.page === null) {
    return <h1>Loading</h1>
  }

  const page =
    data && data.orion_page.length === 1 ? data.orion_page[0] : pageContext.page

  if (!page) {
    return <h1>Error</h1>
  }

  const blocks = {}
  const Layout = layouts[page.layout]

  if (Layout === undefined) {
    throw new Error(`Layout "${page.layout}" could not be found`)
  }

  for (const { block, component, id, props } of page.contents) {
    const Component = components[component]

    if (Component === undefined) {
      throw new Error(`Component "${component}" could not be found`)
    }

    if (blocks[block] === undefined) {
      blocks[block] = []
    }

    blocks[block].push(
      <Component {...props} key={id} loading={loading} page={page} />
    )
  }

  return <Layout {...blocks} loading={loading} page={page} />
}

export default PageProvider
