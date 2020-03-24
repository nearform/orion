import React, { useCallback, useEffect, useState } from 'react'
import TreeView from '../TreeView'
import { mutateTree, moveItemOnTree } from '@atlaskit/tree'
import { useEditComponents } from '../EditComponentProvider'
import { useLocation } from '@reach/router'
import { useMutation, useQuery } from 'graphql-hooks'

import getPagesQuery from '../../queries/get-pages'
import updatePositionMutation from '../../queries/update-position'

function PageTree() {
  const { data } = useQuery(getPagesQuery)
  const { layouts } = useEditComponents()
  const { pathname } = useLocation()
  const [tree, setTree] = useState(null)
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
  }, [data, layouts, setTree])

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

      if (source.parentId !== destination.parentId) {
        return
      }

      const newParent = tree.items[destination.parentId]
      const newTree = moveItemOnTree(tree, source, destination)

      if (!newParent.allowChildren) {
        return
      }

      setTree(newTree)

      await Promise.all(
        newTree.items[newParent.id].children.map((id, position) =>
          updatePosition({
            variables: { id, position },
          })
        )
      )
    },
    [tree, setTree]
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
