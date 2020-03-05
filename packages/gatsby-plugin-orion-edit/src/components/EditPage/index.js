import React, { useMemo, useReducer, useState } from 'react'
import createPageMutation from '../../queries/create-page'
import getPagesQuery from '../../queries/get-pages'
import updatePageMutation from '../../queries/update-page'
import ArticleEditButtons from '../ArticleEditButtons'
import Layout from '../Layout'
import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core'
import { useEditComponents } from '../EditComponentProvider'
import { useMutation, useQuery } from 'graphql-hooks'

function reducer(page, action) {
  switch (action.type) {
    case 'load':
      return action.page

    case 'title':
      return {
        ...page,
        title: action.title,
      }

    case 'path':
      return {
        ...page,
        path: action.path,
      }

    case 'layout':
      return {
        ...page,
        layout: action.layout,
        contents: [],
      }

    case 'publish':
      return {
        ...page,
        published: new Date(),
      }

    case 'component':
      return {
        ...page,
        contents: [
          ...page.contents.filter(content => content.block !== action.block),
          {
            block: action.block,
            component: action.component,
            props: {},
          }
        ]
      }

    case 'props':
      return {
        ...page,
        contents: page.contents.map(content => {
          if (content.block === action.block) {
            return {
              ...content,
              props: action.props,
            }
          } else {
            return content
          }
        }),
      }

    default:
      throw new Error()
  }
}

function EditPage({ initialState, onSave }) {
  const { components, layouts } = useEditComponents()
  const [page, dispatch] = useReducer(reducer, initialState)
  const [createPage] = useMutation(createPageMutation)
  const [updatePage] = useMutation(updatePageMutation)
  const [preview, setPreview] = useState(false)
  const { data } = useQuery(getPagesQuery)
  
  const pages = useMemo(() => {
    if (!data) {
      return []
    }

    const map = page => {
      const filter = descendant => descendant.ancestry.find(ancestor => {
        return ancestor.ancestor.id === page.id && ancestor.direct
      })

      const children = [
        {
          label: 'Add page',
          iconClass: 'fas fa-plus',
          to: `/pages/${page.id}/create`
        },
        ...data.orion_page.filter(filter).map(map),
      ]
      
      return {
        label: page.title,
        to: `/pages/${page.id}/edit`,
        iconClass: children.length === 0 ? 'fas fa-long-arrow-alt-right' : 'fas fa-file',
        children: children.length === 0 ? undefined : children,
      }
    }

    return [
      {
        label: 'Add page',
        iconClass: 'fas fa-plus',
        to: `/pages/create`
      },
      ...data.orion_page.filter(page => page.ancestry.length === 0).map(map),
    ]
  }, [data])

  const layout = layouts[page.layout]
  const blocks = layout === undefined ? [] : layout.blocks
  const PageLayout = layout === undefined ? undefined : layout.preview

  const editLayoutProps = {}
  const previewLayoutProps = {}

  const handleSave = async (publish = false) => {
    const published = publish ? new Date().toISOString() : page.published

    let result

    if (page.id) {
      const { data } = await updatePage({
        variables: {
          id: page.id,
          layout: page.layout,
          path: page.path,
          published,
          showInMenu: page.show_in_menu,
          title: page.title,
          contents: page.contents.map(content => ({
            ...content,
            page_id: page.id,
          })),
        },
      })

      result = data.update_orion_page.returning[0]
    } else {
      const { data } = await createPage({
        variables: {
          layout: page.layout,
          path: page.path,
          published,
          showInMenu: page.show_in_menu,
          title: page.title,
          contents: page.contents,
          ancestry: page.ancestry.map(({ ancestor, direct }) => ({
            ancestor_id: ancestor.id,
            direct,
          })),
        },
      })

      result = data.insert_orion_page.returning[0]
    }

    onSave(result)
  }

  const handlePublish = () => {
    handleSave(true)
  }

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = []

    for (const { ancestor } of page.ancestry) {
      breadcrumbs.push({ title: ancestor.title, to: `/pages/${ancestor.id}/edit` })
    }

    breadcrumbs.push({ title: page.title, to: `/pages/${page.id}/edit` })

    return breadcrumbs
  }, [page])

  for (const block of blocks) {
    const content = page.contents.find(content => content.block === block)

    let editor = null

    if (content) {
      const { editor: Editor, preview: Component } = components[content.component]

      previewLayoutProps[block] = (
        <Component {...content.props} page={page} />
      )

      editor = (
        <Editor
          props={content.props}
          onChange={props => dispatch({
            type: 'props',
            block,
            props
          })}
        />
      )
    }

    editLayoutProps[block] = (
      <div key={block}>
        <FormControl fullWidth>
          <InputLabel shrink>
            Component
          </InputLabel>
          <Select
            value={content === undefined ? '' : content.component}
            onChange={event => dispatch({ 
              type: 'component',
              block,
              component: event.target.value
            })}
          >
            {Object.keys(components).map(component => (
              <MenuItem key={component} value={component}>
                {component}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {editor}
      </div>
    )
  }

  const actions = (
    <ArticleEditButtons
      isEditing={!preview}
      publishDisabled={!!page.published}
      toggleEdit={() => setPreview(!preview)}
      onPublish={handlePublish}
      onSave={handleSave}
    />
  )

  return (
    <Layout
      action={actions}
      breadcrumbs={breadcrumbs}
      data={pages}
      path={`/pages/${page.id}/edit`}
    >
      {preview && PageLayout !== undefined && (
        <PageLayout page={page} {...previewLayoutProps} />
      )}
      {!preview && (
        <>
          <FormControl fullWidth>
            <InputLabel shrink>
              Title
          </InputLabel>
            <Input value={page.title} onChange={event => dispatch({ type: 'title', title: event.target.value })} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel shrink>
              Path
          </InputLabel>
            <Input value={page.path} onChange={event => dispatch({ type: 'path', path: event.target.value })} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel shrink>
              Layout
          </InputLabel>
            <Select value={page.layout} onChange={event => dispatch({ type: 'layout', layout: event.target.value })}>
              {Object.keys(layouts).map(layout => (
                <MenuItem key={layout} label="Layout" value={layout}>
                  {layout}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {PageLayout !== undefined && (
            <PageLayout {...editLayoutProps} />
          )}
        </>
      )}
    </Layout>
  )
}

export default EditPage