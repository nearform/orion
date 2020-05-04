import React, { useCallback, useReducer, useState } from 'react'
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
import slugify from 'gatsby-plugin-orion-core/src/utils/slugify'
import getParentPath from '../../utils/get-parent-path'
import { isEqual } from 'lodash'

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
      if (
        payload.page.title !== undefined &&
        page.title !== payload.page.title
      ) {
        payload.page.path = slugify(payload.page.title)
      }

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
    case 'setPublishedDate':
      return produce(page, draft => {
        draft.published = payload.date
      })
    case 'setExpiresdDate':
      return produce(page, draft => {
        draft.expires = payload.date
      })
    case 'setPath':
      return produce(page, draft => {
        const ancestryPath = getParentPath(page.ancestry)
        draft.path = `${ancestryPath}/${payload.path}`
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

  const handleSaveDraft = () => {
    savePage(true)
  }

  const handlePublish = () => {
    savePage(false)
  }

  const savePage = useCallback(
    async amDraft => {
      const directAncestor = getParentPath(page.ancestry)
      if (page.path === '/') {
        console.warn(
          'This will set the page as your home page. Make sure to rename your old home page or this will not work as expected.'
        )
      } else if (directAncestor !== '' && page.path === `${directAncestor}/`) {
        console.warn(
          'Failed to publish changes. A page with this path already exsists. Try rearranging the pages in the left menu instead.'
        )
        handleSetPath(slugify(page.title))
        return
      }

      let result
      const commonVariables = {
        layout: page.layout,
        path: page.path,
        published: amDraft ? null : page.published || new Date(),
        showInMenu: page.show_in_menu,
        title: page.title,
        expires: page.expires || null,
      }

      if (page.id) {
        const { data } = await updatePage({
          variables: {
            ...commonVariables,
            id: page.id,
            contents: page.contents.map(content => ({
              ...content,
              page_id: page.id, // eslint-disable-line camelcase
            })),
            pageTags: page.tags.map(({ tag }) => ({
              tag_id: tag.tag, // eslint-disable-line camelcase
              page_id: page.id, // eslint-disable-line camelcase
            })),
          },
        })

        result = data.update_orion_page.returning[0]
      } else {
        const { data } = await createPage({
          variables: {
            ...commonVariables,
            contents: page.contents,
            ancestry: page.ancestry.map(({ ancestor, direct }) => ({
              ancestor_id: ancestor.id, // eslint-disable-line camelcase
              direct,
            })),
            authors: page.authors.map(({ user }) => ({
              user_id: user.id, // eslint-disable-line camelcase
            })),
            tags: page.tags.map(({ tag }) => ({ tag_id: tag.tag })), // eslint-disable-line camelcase
          },
        })

        result = data.insert_orion_page.returning[0]
      }

      onSave(result)
    },
    [createPage, onSave, page, updatePage]
  )

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

  const handleSetPublishedDate = useCallback(
    date => dispatch({ type: 'setPublishedDate', date }),
    [dispatch]
  )
  const handleSetExpiresDate = useCallback(
    date => dispatch({ type: 'setExpiresdDate', date }),
    [dispatch]
  )
  const handleSetPath = useCallback(
    path => dispatch({ type: 'setPath', path }),
    [dispatch]
  )

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
      publishedDate={page.published}
      expiresDate={page.expires}
      setExpiresDate={handleSetExpiresDate}
      setPublishedDate={handleSetPublishedDate}
      amDirty={isEqual(page, initialState)}
      onPreview={() => setIsEditing(false)}
      onSaveDraft={handleSaveDraft}
      onPublish={handlePublish}
      onSettings={() => setShowSettings(true)}
      onEdit={() => setIsEditing(true)}
    />
  )

  return (
    <Layout
      action={actions}
      ancestry={page.ancestry}
      path={page.path.split('/').slice(-1)[0]}
      setPath={handleSetPath}
    >
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
