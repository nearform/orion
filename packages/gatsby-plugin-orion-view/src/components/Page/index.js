import React from 'react'
import getPageQuery from '../../queries/get-page.graphql'
import { useViewComponents } from '../ViewComponentProvider'
import { useQuery } from 'graphql-hooks'
import PageSEO from '../PageSEO'
import { navigate } from '@reach/router'
import ErrorMessage from '../ErrorMessage'
import PageLoading from '../PageLoading'

function PageProvider({ location, pageContext }) {
  const { components, layouts } = useViewComponents()

  const { data, loading } = useQuery(getPageQuery, {
    variables: {
      path: location.pathname,
    },
  })
  if (loading && pageContext.defaultPage) {
    return <PageLoading />
  }

  const page =
    data && data.orion_page.length === 1 ? data.orion_page[0] : pageContext.page

  if (!page) {
    navigate('/_not_found')
    return null
  }

  if (!loading && page.is4xx) {
    return (
      <ErrorMessage
        title={page.title}
        errorCode={page.errorCode}
        message={page.message}
      />
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
