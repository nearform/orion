import React, { useCallback, useEffect, useState } from 'react'
import TreeView from '../TreeView'
import { mutateTree, moveItemOnTree } from '@atlaskit/tree'
import { useEditComponents } from '../EditComponentProvider'
import { useLocation } from '@reach/router'
import { useMutation, useQuery } from 'graphql-hooks'

import getPagesQuery from '../../queries/get-pages.graphql'
import updateAncestryMutation from '../../queries/update-ancestry.graphql'
import updatePositionMutation from '../../queries/update-position.graphql'

function PageTree() {
  const { data } = useQuery(getPagesQuery)
  const { layouts } = useEditComponents()
  const { pathname } = useLocation()
  const [tree, setTree] = useState(null)
  const [updateAncestry] = useMutation(updateAncestryMutation)
  const [updatePosition] = useMutation(updatePositionMutation)

  useEffect(() => {
    const items = {
      root: {
        id: 'root',
        title: 'root',
        allowChildren: true,
        children: [],
      },
    }

    if (data) {
      items.root.children = data.orion_page
        .filter(page => page.ancestry.length === 0)
        .map(item => item.id)

      for (const page of data.orion_page) {
        const sort = (a, b) => {
          const first = data.orion_page.find(page => page.id === a)
          const second = data.orion_page.find(page => page.id === b)

          return first.position - second.position
        }

        const children = page.descendants
          .map(({ descendant }) => descendant.id)
          .sort(sort)

        items[page.id] = {
          id: page.id,
          title: page.title,
          to: `/pages/${page.id}/edit`,
          children,
          allowChildren: layouts[page.layout].allowChildren,
          ancestors: page.ancestry.map(({ ancestor }) => ancestor.id),
          iconClass:
            page.path === '/'
              ? 'fas fa-home'
              : layouts[page.layout].allowChildren
              ? 'fas fa-file'
              : 'fas fa-long-arrow-alt-right',
        }
      }

      const current = data.orion_page.find(
        page => pathname === `/pages/${page.id}/edit`
      )

      if (current) {
        for (const { ancestor } of current.ancestry) {
          items[ancestor.id].isExpanded = true
        }
      }
    }

    setTree({
      rootId: 'root',
      items,
    })
  }, [data, layouts, pathname, setTree])

  const onExpand = useCallback(
    id => {
      setTree(mutateTree(tree, id, { isExpanded: true }))
    },
    [tree, setTree]
  )

  const onCollapse = useCallback(
    id => {
      setTree(mutateTree(tree, id, { isExpanded: false }))
    },
    [tree, setTree]
  )

  const onDragEnd = useCallback(
    async (source, destination) => {
      if (!destination) {
        return
      }

      const newParent = tree.items[destination.parentId]
      const newTree = moveItemOnTree(tree, source, destination)
      const promises = []

      if (!newParent.allowChildren) {
        return
      }

      setTree(newTree)

      if (source.parentId !== destination.parentId) {
        const setAncestry = (page, ancestry) => {
          promises.push(
            updateAncestry({
              variables: {
                id: page.id,
                ancestry: ancestry.map((id, index) => ({
                  ancestor_id: id, // eslint-disable-line camelcase
                  page_id: page.id, // eslint-disable-line camelcase
                  direct: index === ancestry.length - 1,
                })),
              },
            })
          )

          for (const id of page.children) {
            setAncestry(tree.items[id], [...ancestry, page.id])
          }
        }

        const item =
          tree.items[tree.items[source.parentId].children[source.index]]
        const ancestry = [...(newParent.ancestors || [])]

        if (destination.parentId !== 'root') {
          ancestry.push(destination.parentId)
        }

        setAncestry(item, ancestry)
      }

      promises.push(
        ...newTree.items[newParent.id].children.map((id, position) =>
          updatePosition({
            variables: { id, position },
          })
        )
      )

      await Promise.all(promises)
    },
    [tree, updateAncestry, updatePosition]
  )

  if (!tree) {
    return null
  }

  return (
    <TreeView
      isDragEnabled
      isNestingEnabled
      tree={tree}
      onCollapse={onCollapse}
      onDragEnd={onDragEnd}
      onExpand={onExpand}
    />
  )
}

export default PageTree
