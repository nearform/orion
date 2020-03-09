import React, { useMemo, useReducer, useState } from 'react'
import createPageMutation from '../../queries/create-page'
import getPagesQuery from '../../queries/get-pages'
import updatePageMutation from '../../queries/update-page'
import ArticleEditButtons from '../ArticleEditButtons'
import Layout from '../Layout'
import LayoutSelect from '../LayoutSelect'
import {
  Divider,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from '@material-ui/core'
import { useEditComponents } from '../EditComponentProvider'
import { useLocation } from '@reach/router'
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

    case 'show_in_menu':
      return {
        ...page,
        show_in_menu: action.value, // eslint-disable-line camelcase
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
          },
        ],
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
          }

          return content
        }),
      }

    default:
      throw new Error('Invalid action')
  }
}

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(3, 2, 4),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
}))

function EditPage({ initialState, onSave }) {
  const { components, layouts, PreviewWrapper } = useEditComponents()
  const [page, dispatch] = useReducer(reducer, initialState)
  const [createPage] = useMutation(createPageMutation)
  const [updatePage] = useMutation(updatePageMutation)
  const [preview, setPreview] = useState(false)
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
  const PreviewLayout = layout === undefined ? undefined : layout.preview

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
          published,
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
  }

  const handlePublish = () => {
    handleSave(true)
  }

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

    let editor = null

    if (content) {
      const { editor: Editor, preview: Component } = components[
        content.component
      ]

      previewLayoutProps[block] = <Component {...content.props} page={page} />

      editor = (
        <Editor
          props={content.props}
          onChange={props =>
            dispatch({
              type: 'props',
              block,
              props,
            })
          }
        />
      )
    }

    editLayoutProps[block] = (
      <div key={block}>
        <FormControl fullWidth className={classes.input}>
          <InputLabel shrink>Component</InputLabel>
          <Select
            value={content === undefined ? '' : content.component}
            onChange={event =>
              dispatch({
                type: 'component',
                block,
                component: event.target.value,
              })
            }
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
      publishDisabled={Boolean(page.published)}
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
      path={location.pathname}
    >
      {preview && PreviewLayout !== undefined && (
        <PreviewWrapper props={{ pageContext: { page } }}>
          <PreviewLayout page={page} {...previewLayoutProps} />
        </PreviewWrapper>
      )}
      {!preview && EditorLayout === undefined && (
        <LayoutSelect
          onSelect={layout => dispatch({ type: 'layout', layout })}
        />
      )}
      {!preview && EditorLayout !== undefined && (
        <>
          <FormControl fullWidth className={classes.input}>
            <InputLabel shrink>Title</InputLabel>
            <Input
              value={page.title}
              onChange={event =>
                dispatch({ type: 'title', title: event.target.value })
              }
            />
          </FormControl>
          <FormControl fullWidth className={classes.input}>
            <InputLabel shrink>Path</InputLabel>
            <Input
              value={page.path}
              onChange={event =>
                dispatch({ type: 'path', path: event.target.value })
              }
            />
          </FormControl>
          <FormControl fullWidth className={classes.input}>
            <InputLabel shrink>Show in menu</InputLabel>
            <Select
              value={page.show_in_menu}
              onChange={event =>
                dispatch({
                  type: 'show_in_menu',
                  value: event.target.value,
                })
              }
            >
              <MenuItem value>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <Divider variant="middle" className={classes.divider} />
          {EditorLayout !== undefined && <EditorLayout {...editLayoutProps} />}
        </>
      )}
    </Layout>
  )
}

export default EditPage
