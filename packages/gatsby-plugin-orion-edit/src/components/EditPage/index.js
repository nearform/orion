import React, { useCallback, useMemo, useReducer, useState } from 'react'
import createPageMutation from '../../queries/create-page'
import getPagesQuery from '../../queries/get-pages'
import updatePageMutation from '../../queries/update-page'
import ArticleEditButtons from '../ArticleEditButtons'
import EditComponent from '../EditComponent'
import Layout from '../Layout'
import LayoutSelect from '../LayoutSelect'
import PageSettings from '../PageSettings'
import { makeStyles } from '@material-ui/core'
import { useEditComponents } from '../EditComponentProvider'
import { useLocation } from '@reach/router'
import { useMutation, useQuery } from 'graphql-hooks'

function reducer(page, { type, ...payload }) {
  switch (type) {
    case 'load':
      return payload.page

    case 'settings':
      return {
        ...page,
        ...payload,
      }

    case 'layout':
      return {
        ...page,
        layout: payload.layout,
        contents: [],
      }

    case 'component':
      return {
        ...page,
        ...payload.page,
        contents: [
          ...page.contents.filter(content => content.block !== payload.block),
          {
            block: payload.block,
            component: payload.component,
            props: payload.props,
          },
        ],
      }

    default:
      throw new Error('Invalid action')
  }
}

const useStyles = makeStyles(theme => ({
  editor: {
    boxShadow: theme.shadows[5],
    margin: theme.spacing(3),
    marginTop: 86,
  },
}))

function EditPage({ initialState, onSave }) {
  const { layouts, wrapper: Wrapper } = useEditComponents()
  const [page, dispatch] = useReducer(reducer, initialState)
  const [createPage] = useMutation(createPageMutation)
  const [updatePage] = useMutation(updatePageMutation)
  const [showSettings, setShowSettings] = useState(false)
  const { data } = useQuery(getPagesQuery)
  const location = useLocation()
  const classes = useStyles()

  const pages = useMemo(() => {
    if (!data) {
      return []
    }

    const sort = (a, b) => {
      if (a.children === undefined && b.children !== undefined) {
        return 1
      }

      if (a.children !== undefined && b.children === undefined) {
        return -1
      }

      return a.label.localeCompare(b.label)
    }

    const map = page => {
      const filter = descendant =>
        descendant.ancestry.find(ancestor => {
          return ancestor.ancestor.id === page.id && ancestor.direct
        })

      const children = []

      if (page.layout !== 'article') {
        children.push({
          label: 'Add page',
          iconClass: 'fas fa-plus',
          to: `/pages/${page.id}/create`,
        })
      }

      children.push(
        ...data.orion_page
          .filter(filter)
          .map(map)
          .sort(sort)
      )

      return {
        label: page.title,
        to: `/pages/${page.id}/edit`,
        iconClass:
          children.length === 0
            ? 'fas fa-long-arrow-alt-right'
            : page.path === '/'
            ? 'fas fa-home'
            : 'fas fa-file',
        children: children.length === 0 ? undefined : children,
      }
    }

    return [
      {
        label: 'Add page',
        iconClass: 'fas fa-plus',
        to: `/pages/create`,
      },
      ...data.orion_page
        .filter(page => page.ancestry.length === 0)
        .map(map)
        .sort(sort),
    ]
  }, [data])

  const layout = layouts[page.layout]
  const blocks = layout === undefined ? [] : layout.blocks
  const EditorLayout = layout === undefined ? undefined : layout.editor

  const editLayoutProps = {}

  const handleSave = useCallback(async () => {
    let result

    if (page.id) {
      const { data } = await updatePage({
        variables: {
          id: page.id,
          layout: page.layout,
          path: page.path,
          published: page.published,
          showInMenu: page.show_in_menu,
          title: page.title,
          contents: page.contents.map(content => ({
            ...content,
            page_id: page.id, // eslint-disable-line camelcase
          })),
        },
      })

      result = data.update_orion_page.returning[0]
    } else {
      const { data } = await createPage({
        variables: {
          layout: page.layout,
          path: page.path,
          published: page.published,
          showInMenu: page.show_in_menu,
          title: page.title,
          contents: page.contents,
          ancestry: page.ancestry.map(({ ancestor, direct }) => ({
            ancestor_id: ancestor.id, // eslint-disable-line camelcase
            direct,
          })),
          authors: page.authors.map(({ user }) => ({
            user_id: user.id, // eslint-disable-line camelcase
          })),
        },
      })

      result = data.insert_orion_page.returning[0]
    }

    onSave(result)
  }, [createPage, onSave, page, updatePage])

  const handleSaveSettings = useCallback(page => {
    setShowSettings(false)
    dispatch({ type: 'settings', ...page })
  }, [dispatch, setShowSettings])

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = []

    for (const { ancestor } of page.ancestry) {
      breadcrumbs.push({
        title: ancestor.title,
        to: `/pages/${ancestor.id}/edit`,
      })
    }

    breadcrumbs.push({
      title: page.title,
      to: `/pages/${page.id}/edit`,
    })

    return breadcrumbs
  }, [page])

  for (const block of blocks) {
    const content = page.contents.find(content => content.block === block)

    editLayoutProps[block] = (
      <EditComponent
        component={content === undefined ? undefined : content.component}
        page={page}
        props={content === undefined ? undefined : content.props}
        onSave={(component, props, page) => dispatch({
          type: 'component',
          page,
          block,
          component,
          props,
        })}
      />
    )
  }

  const actions = (
    <ArticleEditButtons
      onSave={handleSave}
      onSettings={() => setShowSettings(true)}
    />
  )

  return (
    <Layout
      action={actions}
      breadcrumbs={breadcrumbs}
      data={pages}
      path={location.pathname}
    >
      <PageSettings
        open={showSettings}
        page={page}
        onCancel={() => setShowSettings(false)}
        onSave={handleSaveSettings}
      />
      {EditorLayout === undefined && (
        <LayoutSelect
          onSelect={layout => dispatch({ type: 'layout', layout })}
        />
      )}
      {EditorLayout !== undefined && (
        <div className={classes.editor}>
          <Wrapper page={page}>
            <EditorLayout {...editLayoutProps} />
          </Wrapper>
        </div>
      )}
    </Layout>
  )
}

export default EditPage
