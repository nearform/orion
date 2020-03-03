import React, { useEffect, useMemo, useReducer, useState } from 'react'
import T from 'prop-types'
import getPageQuery from '../queries/get-page'
import savePageMutation from '../queries/save-page'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import SecondaryAppBar from 'gatsby-plugin-orion-core/src/components/SecondaryAppBar'
import { Button, FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core'
import { useComponents } from 'gatsby-plugin-orion-core'
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

    case 'prop':
      return {
        ...page,
        contents: page.contents.map(content => {
          if (content.block === action.block) {
            return {
              ...content,
              props: {
                ...content.props,
                [action.prop]: action.value
              }
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

function isPropValid(value, type) {
  if (
    type === T.string.isRequired ||
    type === T.number.isRequired
  ) {
    if (value === undefined || value === null || value === '') {
      return false
    }
  }

  return true
}

function getInput(block, prop, value, type, dispatch) {
  switch (type) {
    case T.string:
    case T.string.isRequired:
      return (
        <Input 
          multiline 
          rowsMax={5} 
          value={value} 
          onChange={event => dispatch({ 
            type: 'prop', 
            block, 
            prop, 
            value: event.target.value
          })}
        />
      )

    case T.number:
    case T.number.isRequired:
      return (
        <Input 
          type="number"
          value={value}
          onChange={event => dispatch({ 
            type: 'prop', 
            block, 
            prop, 
            value: Number(event.target.value)
          })}
        />
      )

    default:
      return null
  }
}

export default function ({ id }) {
  const { components, layouts } = useComponents()
  const [page, dispatch] = useReducer(reducer, null)
  const [savePage] = useMutation(savePageMutation)
  const [preview, setPreview] = useState(false)

  const Layout = page === null ? undefined : layouts[page.layout]
  const filterReserved = key => ['page'].indexOf(key) === -1
  const blocks = page === null ? [] : Object.keys(Layout.propTypes).filter(filterReserved)

  const previewLayoutProps = {}

  const isValid = useMemo(() => {
    if (
      !Layout ||
      !page ||
      !page.title ||
      !page.path ||
      Object.keys(layouts).indexOf(page.layout) === -1 ||
      page.contents.length !== blocks.length
    ) {
      return false
    }

    for (const block of blocks) {
      const content = page.contents.find(content => content.block === block)

      if (!content) {
        return false
      }

      const Component = components[content.component]

      if (!Component) {
        return false
      }

      const props = Object.keys(Component.propTypes).filter(filterReserved)

      for (const prop of props) {
        if (!isPropValid(content.props[prop], Component.propTypes[prop])) {
          return false
        }
      }
    }

    return true
  }, [Layout, blocks, components, layouts, page])

  const { data, loading, refetch } = useQuery(getPageQuery, {
    variables: { id }
  })

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = [{ title: 'Pages', to: '/pages' }]

    if (page) {
      for (const { ancestor } of page.ancestry) {
        breadcrumbs.push({ title: ancestor.title, to: `/pages/${ancestor.id}` })
      }
    }

    return breadcrumbs
  }, [page])

  useEffect(() => {
    if (loading === false && data.orion_page.length === 1) {
      dispatch({ type: 'load', page: data.orion_page[0] })
    }
  }, [data, loading])

  if (!page) {
    return null
  }

  const editor = blocks.map(block => {
    const content = page.contents.find(content => content.block === block)

    let propsEditor = null

    if (content) {
      const Component = components[content.component]
      const props = Object.keys(Component.propTypes).filter(filterReserved)

      previewLayoutProps[block] = (
        <Component {...content.props} page={page} />
      )

      propsEditor = props.map(prop => (
        <div key={prop}>
          <FormControl fullWidth>
            <InputLabel>
              {prop}
            </InputLabel>
            {getInput(block, prop, content.props[prop], Component.propTypes[prop], dispatch)}
          </FormControl>
        </div>
      ))
    }

    return (
      <div key={block}>
        <h3>
          Block: {block}
        </h3>
        <div>
          <FormControl fullWidth>
            <InputLabel>
              Component
            </InputLabel>
            <Select value={content === undefined ? '' : content.component} onChange={event => dispatch({ type: 'component', block, component: event.target.value })}>
              {Object.keys(components).map(component => (
                <MenuItem key={component} value={component}>
                  {component}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {propsEditor}
      </div>
    )
  })

  return (
    <>
      <SecondaryAppBar data={breadcrumbs} onSearch={() => { }} />
      {preview && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'white' }}>
          <Layout page={page} {...previewLayoutProps} />
          <Button onClick={() => setPreview(false)}>
            Hide
          </Button>
        </div>
      )}
      {!preview && (
        <PaddedContainer>
          <FormControl fullWidth>
            <InputLabel>
              Title
          </InputLabel>
            <Input value={page.title} onChange={event => dispatch({ type: 'title', title: event.target.value })} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>
              Path
          </InputLabel>
            <Input value={page.path} onChange={event => dispatch({ type: 'path', path: event.target.value })} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>
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
          {editor}
          <Button disabled={!isValid} color="primary" onClick={async () => {
            await savePage({
              variables: {
                id: page.id,
                layout: page.layout,
                path: page.path,
                published: page.published,
                showInMenu: page.show_in_menu,
                title: page.title,
                contents: page.contents
              }
            })

            refetch()
          }}>
            Save
          </Button>
          <Button onClick={() => setPreview(true)}>
            Preview
          </Button>
        </PaddedContainer>
      )}
    </>
  )
}
