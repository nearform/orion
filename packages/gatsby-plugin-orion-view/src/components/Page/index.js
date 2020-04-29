import React from 'react'
import getPageQuery from '../../queries/get-page'
import { useViewComponents } from '../ViewComponentProvider'
import { useQuery } from 'graphql-hooks'
import PageSEO from '../PageSEO'
import { navigate } from '@reach/router'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'

function PageProvider({ location, pageContext }) {
  const { components, layouts } = useViewComponents()

  const { data, loading } = useQuery(getPageQuery, {
    variables: {
      path: location.pathname,
    },
  })

  if (loading && pageContext.page === null) {
    return <h1>Loading</h1>
  }

  const page =
    data && data.orion_page.length === 1 ? data.orion_page[0] : pageContext.page

  if (!page) {
    navigate('/_not_found')
    return null
  }

  if (page.is4xx) {
    return (
      <PaddedContainer>
        <div>
          <h1>{page.title}</h1>
          <p>
            That&apos;s a {page.type}. {page.message}.
          </p>
        </div>
      </PaddedContainer>
    )
  }

  const blocks = {}
  const Layout = layouts[page.layout]

  if (Layout === undefined) {
    return null
  }

  for (const { block, component, id, props } of page.contents) {
    const Component = components[component]

    if (blocks[block] === undefined) {
      blocks[block] = []
    }

    if (Component !== undefined) {
      blocks[block].push(
        <Component {...props} key={id} loading={loading} page={page} />
      )
    }
  }

  const { content } = page.contents[0].props

  return (
    <>
      <PageSEO
        canonicalHref={`${location.origin}${page.path}`}
        title={page.title}
        content={content}
      />
      <Layout {...blocks} loading={loading} page={page} />
    </>
  )
}

export default PageProvider
