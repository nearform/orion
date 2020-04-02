import React, { useCallback, useMemo, useReducer, useState } from 'react'
import createPageMutation from '../../queries/create-page.graphql'
import updatePageMutation from '../../queries/update-page.graphql'
import ArticleEditButtons from '../ArticleEditButtons'
import EditComponent from '../EditComponent'
import Layout from '../Layout'
import LayoutSelect from '../LayoutSelect'
import PageSettings from '../PageSettings'
import { useEditComponents } from '../EditComponentProvider'
import { useMutation } from 'graphql-hooks'
import produce from 'immer' // eslint-disable-line import/no-named-as-default

export function reducer(page, { type, ...payload }) {
  switch (type) {
    case 'load':
      // TODO Is this case ever used? I don't think so
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
        contents: payload.contents,
      }

    case 'component':
      return {
        ...page,
        ...payload.page, // TODO is spreading the page twice really needed?
        contents: [
          ...page.contents.filter(content => content.block !== payload.block),
          {
            block: payload.block,
            component: payload.component,
            props: payload.props,
          },
        ],
      }
    case 'saveTags':
      return produce(page, draft => {
        draft.tags = payload.tags
      })

    default:
      throw new Error('Invalid action')
  }
}

function EditPage({ initialState, onSave }) {
  const { layouts, wrapper: Wrapper } = useEditComponents()
  const [page, dispatch] = useReducer(reducer, initialState)
  const [createPage] = useMutation(createPageMutation)
  const [updatePage] = useMutation(updatePageMutation)
  const [isEditing, setIsEditing] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  const layout = layouts[page.layout]
  const blocks = layout === undefined ? {} : layout.blocks
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

  const handleLayoutSelect = useCallback(
    layout => {
      const { blocks } = layouts[layout]

      dispatch({
        type: 'layout',
        layout,
        contents: Object.entries(blocks).map(([key, block]) => ({
          block: key,
          component: block.defaultComponent,
          props: {},
        })),
      })
    },
    [layouts, dispatch]
  )

  const handleSaveSettings = useCallback(
    page => {
      setShowSettings(false)
      dispatch({ type: 'settings', ...page })
    },
    [dispatch, setShowSettings]
  )

  const handleSaveTags = useCallback(
    tags => {
      dispatch({ type: 'saveTags', tags })
    },
    [dispatch]
  )

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

  for (const [key, block] of Object.entries(blocks)) {
    const content = page.contents.find(content => content.block === key)

    editLayoutProps[key] = (
      <EditComponent
        block={block}
        component={content === undefined ? undefined : content.component}
        isEditing={isEditing}
        page={page}
        props={content === undefined ? undefined : content.props}
        handleSaveTags={handleSaveTags}
        onSave={(component, props, page) =>
          dispatch({
            type: 'component',
            block: key,
            page,
            component,
            props,
          })
        }
      />
    )
  }

  const actions = (
    <ArticleEditButtons
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onPreview={() => setIsEditing(false)}
      onSave={handleSave}
      onSettings={() => setShowSettings(true)}
    />
  )

  return (
    <Layout action={actions} breadcrumbs={breadcrumbs}>
      <PageSettings
        open={showSettings}
        page={page}
        onCancel={() => setShowSettings(false)}
        onSave={handleSaveSettings}
      />
      {EditorLayout === undefined && (
        <LayoutSelect onSelect={handleLayoutSelect} />
      )}
      {EditorLayout !== undefined && (
        <Wrapper page={page}>
          <EditorLayout {...editLayoutProps} />
        </Wrapper>
      )}
    </Layout>
  )
}

export default EditPage
